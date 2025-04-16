# Extending project

## Intro

Version 1.x was amazingly bloated, and overcomplicated, thus it was harder, and unpleasant to add any changes.

Of course the so-called "Legacy Code" remains, but it's no longer that much needed to dig into it anymore.

## Backend
- create controller in `/src/Action` (choose proper folder, depending on what You want to add),
  - to make things easier You can just copy over existing classes

::: warning
Version 2.x contains a lot of dead code (which will be removed over time), so don't copy the old code. 

As an example to use You can take: `src/Action/Modules/Passwords/MyPasswordsAction.php`
:::

In here You can practically create any route that You want, and it will be reachable on the frontend.

You can use few route patterns to make the frontend-backend data control even easier - look below.

```php
#[Route("/module/your-base-route", name: "module.your_base_route.")]
#[ModuleAnnotation(values: ["name" => ModulesController::MODULE_NAME_PASSWORDS])]
class YourAction extends AbstractController {
    #[Route("/all", name: "get_all", methods: [Request::METHOD_GET])]
    public function getAll(): JsonResponse;
    
    #[Route("/{id}", name: "get", methods: [Request::METHOD_GET])]
    public function getOne(MyNotesCategories $category): JsonResponse;    
    
    #[Route("", name: "new", methods: [Request::METHOD_POST])]
    public function new(Request $request): JsonResponse;

    #[Route("/{id}", name: "update", methods: [Request::METHOD_PATCH])]
    public function update(MyPasswords $password, Request $request): JsonResponse;
    
    #[Route("/{id}", name: "remove", methods: [Request::METHOD_DELETE])]
    public function remove(MyPasswords $password): JsonResponse;
}
```

Always use `App\Response\Base\BaseResponse` cast into `JsonResponse` to return data on frontend.

## Frontend

- create pages inside `src/views`,
- register routes inside one of the classes `src/router/VueRouter.ts`, or at best in one of the corresponding module routes list,
- add backend routes into one of the `Symfony....Routes` classes
  - example `SymfonyPaymentsRoutes`,
- manipulate backend data by using one of these:
  - `this.$axios` (for any routes),
  - `this.$moduleCall` (for above-mentioned pattern routes),
- extend `src/components/LoggedIn/Navigation/Sidebar.vue` for new menu elements,