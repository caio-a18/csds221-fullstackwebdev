<template>
  <div class="card">
    <div class="row text-muted" id="tb-headings">
      <!-- Makes headings -->
      <div class="col"><p>Title</p></div>
      <div class="col"><p>Description</p></div>
      <div class="col"><p>Deadline</p></div>
      <div class="col"><p>Priority</p></div>
      <div class="col"><p>Is Complete</p></div>
      <div class="col"><p>Action</p></div>
    </div>
  </div>
</template>
<script>
/** Exports Default */
export default {
  name: 'Table',
};
</script>

<!-- Style for p of all headings-->
<style>
p {
  font-size: 16px;
  padding-top: 20%;
  padding-bottom: 10%;
  margin: auto;
}
</style>
