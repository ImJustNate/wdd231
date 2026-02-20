const clientId = import.meta.env.VITE_CLIENT_ID_KEY; 
console.log(clientId)

const redirectUri = 'https://deploy-preview-8--fairplayer.netlify.app/'; 
const scope = 'playlist-read-private streaming user-read-playback-state user-modify-playback-state';

// --- PKCE CRYPTO HELPERS ---

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
};

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

// --- AUTHENTICATION FLOW ---

async function redirectToSpotify() {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    window.localStorage.setItem('code_verifier', codeVerifier);

    const params = new URLSearchParams({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectUri,
        scope: scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

async function getAccessToken(code) {
    const codeVerifier = window.localStorage.getItem('code_verifier');

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        }),
    });

    return await response.json();
}

// --- UI & API CALLS ---

async function fetchPlaylists(token) {
    try {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        renderPlaylists(data.items);
    } catch (error) {
        console.error("Error fetching playlists:", error);
    }
}

function renderPlaylists(playlists) {
    const container = document.getElementById('playlists-container');
    if (!playlists) {
        container.innerHTML = "No playlists found.";
        return;
    }

    container.innerHTML = playlists.map(pl => `
        <div class="playlist-card" onclick="alert('Playlist ID: ${pl.id}')">
            <img src="${pl.images[0]?.url || 'https://via.placeholder.com/60'}" alt="cover">
            <div>
                <strong>${pl.name}</strong><br>
                <small>${pl.tracks.total} tracks</small>
            </div>
        </div>
    `).join('');
}

// --- INITIALIZATION ---

const init = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
        document.getElementById('login-section').style.display = 'block';
        document.getElementById('login-button').addEventListener('click', redirectToSpotify);
    } else {
        document.getElementById('app-section').style.display = 'block';
        // Remove code from URL for cleanliness
        window.history.replaceState({}, document.title, "/");
        
        const authData = await getAccessToken(code);
        if (authData.access_token) {
            // Save token for future use (like the player)
            window.localStorage.setItem('access_token', authData.access_token);
            fetchPlaylists(authData.access_token);
        }
    }
};

  init();

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// // 2. Use it inside an async function
// async function waitExample() {
//   console.log("Start waiting...");
//   await sleep(3000); // Pauses the function for 3 seconds
//   console.log("Waited 3 seconds!");
//   init();
// }

// // 3. Call the async function
// waitExample();