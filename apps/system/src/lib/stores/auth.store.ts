// src/lib/stores/authStore.ts
import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';
import { supabase } from '$lib/supabase/client';

interface AuthStore {
	user: User | null;
}

const authStore = writable<AuthStore>({ user: null });

async function initializeAuth() {
	const {
		data: { session }
	} = await supabase.auth.getSession();
	authStore.set({ user: session?.user ?? null });
}

initializeAuth();

supabase.auth.onAuthStateChange((_, session) => {
	authStore.set({ user: session?.user ?? null });
});

export default authStore;
