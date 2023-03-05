export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.c8f2379e.js","imports":["_app/immutable/entry/start.c8f2379e.js","_app/immutable/chunks/index.dedb3b4e.js","_app/immutable/chunks/singletons.53ff4eed.js","_app/immutable/chunks/paths.27cc6757.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.151e2cdd.js","imports":["_app/immutable/entry/app.151e2cdd.js","_app/immutable/chunks/index.dedb3b4e.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js'),
			() => import('../output/server/nodes/4.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/chat/add",
				pattern: /^\/api\/chat\/add\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/chat/add/_server.ts.js')
			},
			{
				id: "/api/chat/get",
				pattern: /^\/api\/chat\/get\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/chat/get/_server.ts.js')
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/test",
				pattern: /^\/test\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
