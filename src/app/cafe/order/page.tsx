import { CafeOrderClient } from "@/components/CafeOrderClient";
import { PageHeader } from "@/components/ui";

export default function CafeOrderPage() {
  return (
    <>
      <PageHeader eyebrow="3.2 Custom Order / 自定义下单" title="Configurable cafe order and cart" subtitle="Zustand + localStorage keeps the demo cart after refresh. 使用 Zustand 和本地存储保留购物车。" />
      <CafeOrderClient />
    </>
  );
}
