// Ka$hFlow Connect browser API adapter.
// Cloudflare Access protects the app and injects the signed identity assertion.
// Never put an Access token, API secret, or workspace authorization decision in localStorage.
let activeWorkspaceId = null;

async function request(path, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set("Accept", "application/json");
  if (options.body !== undefined) headers.set("Content-Type", "application/json");
  if (activeWorkspaceId) headers.set("X-Workspace-Id", activeWorkspaceId);
  const response = await fetch("/api/" + path.replace(/^\//, ""), {
    ...options,
    headers,
    credentials: "same-origin",
    cache: "no-store"
  });
  const result = response.status === 204 ? null : await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result?.error || "Ka$hFlow Connect request failed (" + response.status + ")");
  return result;
}

export const KashFlowAPI = {
  async me() { return request("me"); },
  async workspaces() { return request("workspaces"); },
  selectWorkspace(id) {
    if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)) throw new Error("Invalid workspace ID");
    activeWorkspaceId = id;
  },
  clearWorkspace() { activeWorkspaceId = null; },
  list(resource, { limit = 50, offset = 0 } = {}) {
    return request(resource + "?limit=" + encodeURIComponent(limit) + "&offset=" + encodeURIComponent(offset));
  },
  create(resource, record) {
    return request(resource, { method: "POST", body: JSON.stringify(record) });
  },
  update(resource, id, changes) {
    return request(resource + "/" + encodeURIComponent(id), { method: "PATCH", body: JSON.stringify(changes) });
  },
  remove(resource, id) {
    return request(resource + "/" + encodeURIComponent(id), { method: "DELETE" });
  }
};
