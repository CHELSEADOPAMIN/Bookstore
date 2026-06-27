import { OrderStatusClient } from "@/components/OrderStatusClient";
import { PageHeader } from "@/components/ui";

export default function CafeStatusPage() {
  return (
    <>
      <PageHeader eyebrow="3.3 Order Status / 订单状态" title="Animated order progress for live demos" />
      <OrderStatusClient />
    </>
  );
}
