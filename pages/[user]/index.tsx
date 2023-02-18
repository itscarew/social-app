import Layout from '@/components/Layout'
import ProfileComponent from '@/components/ProfileComponent'

export default function UserProfile() {
    return (
        <>
            <Layout>
                <div className="w-full min-h-screen p-4">
                    <ProfileComponent />
                </div>
            </Layout>
        </>
    )
}
