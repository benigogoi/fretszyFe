// src/services/gameScoreService.ts
import axios from 'axios';

// Use a variable that works in the browser environment
const API_URL = 'https://BeniGogoi.pythonanywhere.com';


// Get the auth token from local storage (using the same pattern as your authService)
const getAuthToken = (): string | null => {
    const authData = localStorage.getItem('fretszy_auth_token');
    return authData || null;
};

// Configure axios with auth token
const authAxios = () => {
    const token = getAuthToken();
    return axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Token ${token}` : '',
        }
    });
};

// Format date for display
export const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

// Get user's best score
export const getBestScore = async (
    gameType: string = 'fretboard', 
    fretLength: number = 12, 
    startString: number = 6, 
    endString: number = 1,
    currentScore: number | null = null  // Add currentScore parameter
) => {
    try {
        // Create parameters object for the API request
        const params: Record<string, any> = {
            game_type: gameType,
            fret_length: fretLength,
            start_string: startString,
            end_string: endString
        };

        // Add currentScore to params if it's provided and greater than 0
        if (currentScore !== null && currentScore > 0) {
            params.current_score = currentScore;
        }

        console.log('Fetching best score with params:', params);

        // Make API request with all relevant parameters
        const response = await authAxios().get('/api/game-scores/', { params });
        
        console.log('Best score API response:', response.data);
        
        // Always return a score even if the backend returns an empty response
        const scoreData = response.data;
        return {
            score: scoreData.score || 0,
            date_achieved: scoreData.date_achieved,
            fret_length: scoreData.fret_length || fretLength,
            start_string: scoreData.start_string || startString,
            end_string: scoreData.end_string || endString,
            username: scoreData.username
        };
    } catch (error) {
        console.error('Error fetching best score:', error);
        // If axios error, log more details
        if (axios.isAxiosError(error)) {
            console.error('Response status:', error.response?.status);
            console.error('Response data:', error.response?.data);
        }
        
        // If there's an error, return a default object with the current score if provided
        return {
            score: currentScore !== null ? currentScore : 0,
            date_achieved: null,
            fret_length: fretLength,
            start_string: startString,
            end_string: endString,
            username: null
        };
    }
};

// Save a game score
// src/services/gameScoreService.ts
// Add enhanced debugging to saveGameScore function

export const saveGameScore = async (
    score: number, 
    gameType: string = 'fretboard', 
    fretLength: number = 12, 
    startString: number = 6, 
    endString: number = 1
) => {
    try {
        console.log('SAVE ATTEMPT: Starting saveGameScore with:', { score, gameType, fretLength, startString, endString });
        
        // Get the auth token directly from localStorage
        const authToken = localStorage.getItem('fretszy_auth_token');
        
        if (!authToken) {
            console.error('AUTH ERROR: No auth token found in localStorage');
            throw new Error('Authentication token not found');
        }
        
        console.log('AUTH: Token found in localStorage');
        
        // Create the request body
        const requestBody = {
            score: parseInt(String(score)),
            game_type: gameType,
            fret_length: parseInt(String(fretLength)),
            start_string: parseInt(String(startString)),
            end_string: parseInt(String(endString))
        };
        
        console.log('REQUEST: About to send with body:', requestBody);
        
        // Use fetch API for the request
        const response = await fetch(`${API_URL}/api/game-scores/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`
            },
            body: JSON.stringify(requestBody)
        });
        
        console.log('RESPONSE: Status code:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API ERROR: Response not OK:', errorText);
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('SUCCESS: Score saved, response data:', data);
        return data;
    } catch (error) {
        console.error('CRITICAL ERROR in saveGameScore:', error);
        // Re-throw to allow handling in the component
        throw error;
    }
};