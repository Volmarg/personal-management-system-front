<script lang="ts">
export default {
  methods: {
    /**
     * @description handle menu element click
     *              - if it's mobile device then hide menu when url menu element gets clicked,
     */
    onMenuElementClick() {
      this.$view.scrollContentOfElement(window);
      if (!this.isMobileBrowser) {
        return;
      }

      this.hideSidebar();
    },
  }
}
</script>