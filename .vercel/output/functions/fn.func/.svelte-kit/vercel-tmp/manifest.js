export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.c8f2379e.js","imports":["_app/immutable/entry/start.c8f2379e.js","_app/immutable/chunks/index.dedb3b4e.js","_app/immutable/chunks/singletons.53ff4eed.js","_app/immutable/chunks/paths.27cc6757.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.151e2cdd.js","imports":["_app/immutable/entry/app.151e2cdd.js","_app/immutable/chunks/index.dedb3b4e.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
