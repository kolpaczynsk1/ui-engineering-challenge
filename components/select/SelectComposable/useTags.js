import { reactive } from '@nuxtjs/composition-api';


export default function useTheme() {
    const activeTags = reactive([]);

    const addTag = (tag) => {
        for(let [index, activeTag] of activeTags.entries())
            if(activeTag.id === tag.id) {
                activeTags.splice(index, 1);
                return;
            }
        
        activeTags.push(tag);
    }

    const enterTag = (tag) => {
        if(!activeTags.some(item => item.id === tag.id))
            activeTags.push(tag);
    }

    const deleteTag = () => {
        activeTags.pop();
    }

    return {
        activeTags,
        addTag,
        deleteTag,
        enterTag,
    }
}