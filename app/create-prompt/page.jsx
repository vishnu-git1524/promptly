'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Confetti from 'react-confetti'; // Import Confetti
import Form from '@components/Form';

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const [showConfetti, setShowConfetti] = useState(false); // State for confetti

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                setShowConfetti(true); // Show confetti on success
                setTimeout(() => {
                    setShowConfetti(false); // Hide confetti
                    router.push('/'); // Navigate to the desired page after confetti finishes
                }, 4000); // Delay navigation by 3 seconds to match confetti duration
            }
            
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="w-full max-w-full flex-start flex-col">
            {showConfetti && <Confetti />} {/* Show Confetti here */}

            <Form
                type="Create"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={createPrompt}
            />
        </section>
    );
};

export default CreatePrompt;
