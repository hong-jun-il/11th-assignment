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
    <div>
      <MemberFormProvider>
        <AsyncBoundary pendingFallback={<LoadingComponent />}>
          <MemberInfo id={id} />
        </AsyncBoundary>
      </MemberFormProvider>
    </div>
  );
}
