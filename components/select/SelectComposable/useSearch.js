

import { ref } from '@nuxtjs/composition-api';

export default function useTheme() {
    const searchTerm = ref('');

    const getInputValue = (value) => {
        searchTerm.value = value;
    };
    
    let suggestion = ref({});
    
    const getSuggestion = (item) => {
        suggestion.value = item;
    }

    return {
        searchTerm,
        getInputValue,
        suggestion,
        getSuggestion
    }
}