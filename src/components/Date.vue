<template>
    <span :title="timestamp">
        {{ timestamp | moment("YYYY-MM-DD HH:mm:ss") }}
        <br />
        <small><timeago :datetime="timestamp * 1000" :auto-update="10"></timeago></small>
    </span>
</template>

<script>

export default {
  name: 'date',
  props: ['timestamp'],
};
</script>

<style scoped lang="scss">

</style>
