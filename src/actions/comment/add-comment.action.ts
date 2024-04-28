import apiClient from "$lib/api"
import { lastPublishedStore } from "../../stores/pitch.store"

export async function addComment(pitchId: string, content: string, parentId?: string) {
    const response = await apiClient.post(
        `/api/pitch/${pitchId}/comment`,
        { content, parent_id: parentId},
    )

    if (response.status === 200) {
        lastPublishedStore.update(store => {
            const pitch = store.pitches.find(p => p.pitch.id === pitchId)
            if (pitch) {
                if (pitch.pitch.comments && Array.isArray(pitch.pitch.comments)) {
                    if (parentId) {
                        const comment = pitch.pitch.comments.find(c => c.id === parentId);
                        if (!comment) return store;
                        if (comment.childs && Array.isArray(comment.childs)) {
                            comment.childs.push(response.data);
                        } else {
                            comment.childs = [response.data];
                        }
                    } else { 
                        pitch.pitch.comments?.push(response.data)
                    }
                } else {
                    pitch.pitch.comments = [response.data];
                }
            }
            return store
        });
    }
}