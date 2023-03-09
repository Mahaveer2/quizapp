<script>
  import { fly } from 'svelte/transition'; 
</script>

<div class="w-full flex justify-center"
    in:fly="{{ y: -50, duration: 250, delay: 300 }}"
    out:fly="{{ y: -50, duration: 250 }}" 
    >
<slot></slot>  
</div>