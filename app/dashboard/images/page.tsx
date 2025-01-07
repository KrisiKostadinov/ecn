import PageHeader from "./_components/page-header";

async function getData() {
  const data: [] = [];
  return data;
}

export default async function ImagesPage() {
  const data = await getData();

  return (
    <div className="flex-1 mx-5">
      <div className="flex justify-between items-center">
        <PageHeader length={data.length} />
      </div>
    </div>
  );
}
