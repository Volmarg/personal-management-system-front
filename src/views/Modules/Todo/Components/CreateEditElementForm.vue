<template>
  <div class="flex justify-center w-full">
    <div class="w-full md:w-1/2">
      <div class="mt-6 w-full flex flex-col">
        <h2 class="text-lg">{{ header }}</h2>

        <FormInput type="text"
                   v-model="form.name"
                   :is-required="true"
                   :label="$t('todo.common.form.createEditTodoElement.name.label')"
        />

        <MediumButtonWithIcon :text="$t('todo.common.form.createEditTodoElement.submit.label')"
                              button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                              class="w-full mb-1 md:col-start-1 md:col-end-2 mt-2"
                              button-classes="w-full md:w-auto m-0-force"
                              text-classes="text-center w-full"
                              @button-click="onSubmit"
        />

      </div>
    </div>
  </div>
</template>

 <script lang="ts">
 import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
 import FormInput            from "@/components/Form/Input.vue";

 import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
 import SymfonyTodoRoutes       from "@/router/SymfonyRoutes/Modules/SymfonyTodoRoutes";
 import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";
 import {ComponentData}         from "@/scripts/Vue/Types/Components/types";
 import {SingleTodo}            from "@/scripts/Core/Types/Modules/Todo";

 export default {
   data(): ComponentData {
     return {
       form: {
         name: ''
       },
     }
   },
   props: {
     header: {
       type: String,
       required: true,
     },
     id: {
       type: [Number, null],
       required: false,
       default: null
     },
     initialName: {
       type: String,
       required: false,
       default: ''
     },
     todoData: {
       type: Object as SingleTodo,
       required: true,
     }
   },
   emits: [
     "submit",
   ],
   components: {
     FormInput,
     MediumButtonWithIcon
   },
   methods: {
     /**
      * @description handle submitting new tab element, insert data in db
      */
     async onSubmit(): void {
       let data = {
         name: this.form.name,
       };

       let config = new BackendModuleCallConfig(SymfonyTodoRoutes.TODO_ELEMENT_BASE_URL, this.id, BaseApiResponse, data);
       config.parentId = this.todoData.id;
       config.reload = false;

       if (this.id) {
         await this.$moduleCall.update(config);
       } else {
         await this.$moduleCall.new(config);
       }

       this.$emit('submit');
     },
   },
   beforeMount() {
     this.form.name = this.initialName;
   },
   watch: {
     initialName(): void {
       this.form.name = this.initialName;
     }
   }
 }
 </script>