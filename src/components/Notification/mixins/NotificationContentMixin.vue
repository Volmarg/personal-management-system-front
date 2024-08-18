<script lang="ts">
export default {
  methods: {
    /**
     * @description takes array of messages and transforms them into string suitable for notifications box
     */
    messagesArrayToString(messages: Array<string | number | null>): string {
      let notificationMessage = "";
      for (let message of messages) {
        notificationMessage += ` ➤ ${message} <br/>`
      }

      return notificationMessage;
    }
  }
}
</script>