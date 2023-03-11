<script>
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';
 
	// NProgress css
	import './progressbar.css';
 
	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16
	});
 
	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}
</script>