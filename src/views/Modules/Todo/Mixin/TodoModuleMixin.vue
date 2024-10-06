<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import BaseError from "@/scripts/Core/Error/BaseError";

export default {
  data(): ComponentData {
    return {
      boundModule: {
        goals: "goals",
        issues: "issues"
      }
    }
  },
  methods: {
    /**
     * @description returns the matching todo object for provided id, or throws error if none was found
     */
    getTodoById(id: number, allTodo: Array<Record>): Record {
      let matchingTodo = null;
      for (let singleTodo of allTodo) {
        if (singleTodo.id == id) {
          matchingTodo = singleTodo
          break;
        }
      }

      if (!matchingTodo) {
        throw new BaseError(`No todo found for id: ${id}`);
      }

      return matchingTodo;
    }

  }
}
</script>