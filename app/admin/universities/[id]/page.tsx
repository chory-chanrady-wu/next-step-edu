export default function UniversityDetailsPage({ params }: { params: { id: string } }) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">University Details: {params.id}</h1>
            <p>Details coming soon...</p>
        </div>
    );
}
