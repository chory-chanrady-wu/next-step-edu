export default function ScholarshipDetailsPage({ params }: { params: { id: string } }) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Scholarship Details: {params.id}</h1>
            <p>Details coming soon...</p>
        </div>
    );
}
