import Layout from "@/components/Layout";
import React from "react";

export function withLayout<P extends Record<string, unknown>>(meta: {
  title?: string;
  keywords?: string;
  description?: string;
  image?: string;
}) {
  return (Component: React.ComponentType<P>): React.FC<P> => {
    const WrappedComponent: React.FC<P> = (props: P) => (
      <Layout
        title={meta.title}
        keywords={meta.keywords}
        description={meta.description}
        image={meta.image}
      >
        <Component {...props} />
      </Layout>
    );

    WrappedComponent.displayName = `withLayout(${
      Component.displayName || Component.name || "Component"
    })`;

    return WrappedComponent;
  };
}
