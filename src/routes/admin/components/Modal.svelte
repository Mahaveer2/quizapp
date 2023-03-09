<script>
  export let title = '';
  export let isModalOpen = false;

  function closeModal() {
    isModalOpen = false;
  }
</script>

<div class="modal" class:modal-open={isModalOpen}>
  <div class="modal-box">
    <div class="flex justify-between items-center w-full">
      <h3 class="text-lg font-bold">{title}</h3>
      <button class="text-xl cursor-pointer" on:click={closeModal}>&times;</button>
    </div>
    <slot />
  </div>
</div>