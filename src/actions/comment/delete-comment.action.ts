import apiClient from "$lib/api"
import { lastPublishedStore } from "../../stores/pitch.store"

export async function deleteComment(commentId: string, pitchId: string, parentId?: string) {
    const response = await apiClient.delete(
        `/api/comment/${commentId}`
    )

    if (response.status === 200) {
        lastPublishedStore.update(store => {
            const pitch = store.pitches.find(p => p.pitch.id === pitchId)
            if (pitch) {
                if (pitch.pitch.comments && Array.isArray(pitch.pitch.comments)) {
                    if (parentId) {
                        const comment = pitch.pitch.comments.find(c => c.id === parentId);
                        if (!comment || !comment.childs) return store;
                        comment.childs = [
                            ...comment.childs.filter((child) => child.id !== commentId),
                            response.data,
                        ];
                    } else { 
                        pitch.pitch.comments = [
                            ...pitch.pitch.comments.filter((comment) => comment.id !== commentId),
                            response.data,
                        ];
                    }
                }
            }

            return store
        });
    }
}