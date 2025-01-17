export default function (plop) {
  plop.setGenerator('module', {
    description: 'Create new module',
    prompts: [
      {
        type: 'input',
        name: 'moduleName',
        message: 'What is the name of the module?',
      },
    ],
    actions: [
      /* Create module api */
      {
        type: 'add',
        path: '../src/api/{{dashCase moduleName}}/index.ts',
        templateFile: './templates/api/api.hbs',
        skipIfExists: true,
      },
      /* Create module home page */
      {
        type: 'add',
        path: '../src/app/(authenticated)/{{dashCase moduleName}}s/page.tsx',
        templateFile: './templates/page/page.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../src/app/(authenticated)/{{dashCase moduleName}}s/_hooks/use-{{dashCase moduleName}}s-query.ts',
        templateFile: './templates/page/hooks/template-query.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../src/app/(authenticated)/{{dashCase moduleName}}s/_hooks/use-delete-{{dashCase moduleName}}-mutation.ts',
        templateFile: './templates/page/hooks/template-mutation.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../src/app/(authenticated)/{{dashCase moduleName}}s/_components/form-{{dashCase moduleName}}/index.tsx',
        templateFile: './templates/page/component/form-template.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../src/app/(authenticated)/{{dashCase moduleName}}s/_components/form-{{dashCase moduleName}}/schema.ts',
        templateFile: './templates/page/component/schema-template.hbs',
        skipIfExists: true,
      },
      /* Create module create page */
      {
        type: 'add',
        path: '../src/app/(authenticated)/{{dashCase moduleName}}s/create/page.tsx',
        templateFile: './templates/page/create/page-template.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../src/app/(authenticated)/{{dashCase moduleName}}s/create/_hooks/use-create-{{dashCase moduleName}}-mutation.ts',
        templateFile:
          './templates/page/create/hooks/create-module-mutation.hbs',
        skipIfExists: true,
      },
      /* Create detail page */
      {
        type: 'add',
        path: '../src/app/(authenticated)/{{dashCase moduleName}}s/[id]/page.tsx',
        templateFile: './templates/page/[id]/page.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../src/app/(authenticated)/{{dashCase moduleName}}s/[id]/_hooks/use-{{dashCase moduleName}}-query.ts',
        templateFile: './templates/page/[id]/hooks/use-module-query.hbs',
        skipIfExists: true,
      },
      /* Create update page */
      {
        type: 'add',
        path: '../src/app/(authenticated)/{{dashCase moduleName}}s/[id]/update/page.tsx',
        templateFile: './templates/page/[id]/update/page.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../src/app/(authenticated)/{{dashCase moduleName}}s/[id]/update/_hooks/use-update-{{dashCase moduleName}}-mutation.ts',
        templateFile:
          './templates/page/[id]/update/hooks/update-module-mutation.hbs',
        skipIfExists: true,
      },

      /* Modify menu items */
      {
        type: 'modify',
        path: '../src/app/_components/ui/layout/menu.tsx',
        pattern: /(export const NavbarMenu = \[)([\s\S]*?)(\];)/g,
        template: `$1$2  {
          key: '/{{dashCase moduleName}}s',
          label: <Link href="/{{dashCase moduleName}}s">{{pascalCase moduleName}}s</Link>,
          icon: <UserOutlined />,
          permissions: [],
        },\n$3`,
      },
      /* Modify auth middleware */
      {
        type: 'modify',
        path: '../src/middleware.ts',
        pattern: /(\bmatcher:\s*\[[^\]]*)\]/,
        template: `$1, '/{{dashCase moduleName}}s/:path*']`,
      },
    ],
  });
}
