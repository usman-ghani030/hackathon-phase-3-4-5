---
name: frontend-ui-development
description: Master the creation of reusable components, complex page structures, and responsive layouts using modern styling techniques.
---

# Frontend UI Development

## Instructions

1. **Component Architecture**
   - Break UI into **atomic components** (buttons, inputs) and **composite components** (cards, navbars).
   - Use props/parameters to make components dynamic and reusable.
   - Maintain a clear separation of concerns between logic and presentation.

2. **Layout & Grid Systems**
   - Use **Flexbox** for one-dimensional layouts (toolbars, lists).
   - Use **CSS Grid** for two-dimensional page structures (dashboards, galleries).
   - Implement "Wrapper" or "Container" components to manage consistent spacing.



3. **Page Composition**
   - Define a **Main Layout** (Header, Sidebar, Footer) that wraps individual pages.
   - Use "Slots" or "Children" to inject page-specific content into shared templates.
   - Ensure semantic HTML tags (`<main>`, `<section>`, `<article>`) are used for SEO and accessibility.

4. **Styling & Theming**
   - Use **Utility-first CSS** (e.g., Tailwind) or **CSS Modules** to prevent style leakage.
   - Define a design token system (colors, spacing, typography) via CSS Variables.
   - Implement **Responsive Design** using media queries or container queries.



## Best Practices
- **Mobile-First:** Design for the smallest screen first and scale up.
- **Accessibility (a11y):** Ensure high color contrast and use ARIA labels where necessary.
- **DRY (Don't Repeat Yourself):** If you use a UI pattern three times, turn it into a component.
- **Performance:** Optimize images and lazy-load components that are not immediately visible.

## Example Structure (React/Tailwind)

```tsx
// 1. Reusable Component
const Card = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    {children}
  </div>
);

// 2. Page Layout
const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-[250px_1fr] min-h-screen">
    <aside className="bg-slate-900 text-white p-4">Navigation</aside>
    <main className="p-8 bg-gray-50">{children}</main>
  </div>
);

// 3. Page Assembly
export default function ProfilePage() {
  return (
    <DashboardLayout>
      <Card title="User Profile">
        <p>Welcome to your frontend dashboard.</p>
      </Card>
    </DashboardLayout>
  );
}