import MemberInfo from "./_components/MemberInfo";
import AsyncBoundary from "@/components/AsyncBoundary";
import LoadingComponent from "@/components/ui/LoadingComponent";
import MemberFormProvider from "../_components/MemberFormProvider";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MemberDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <AsyncBoundary pendingFallback={<LoadingComponent />}>
      <MemberFormProvider>
        <MemberInfo id={id} />
      </MemberFormProvider>
    </AsyncBoundary>
  );
}
