import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { PessoaResponseDto } from '../../../../server/src/modules/auth/dto/PessoaResponseDto';
import { authMdl } from '@/api/auth-mdl';
import type { LoginDto } from '../../../../server/src/modules/auth/dto/LoginDto';
import type { PessoaCreateDto } from '../../../../server/src/modules/auth/dto/PessoaCreateDto';

type AuthState = {
  user: PessoaResponseDto | null;
  login: (data: LoginDto) => Promise<void>;
  register: (data: PessoaCreateDto) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: PessoaResponseDto | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      login: async (data: LoginDto) => {
        const res = await authMdl.login(data);
        if (res.data) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          set({ user: res.data.user });
        }
      },

      register: async (data: PessoaCreateDto) => {
        const res = await authMdl.register(data);
        if (res.data) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          set({ user: res.data.user });
        }
      },

      signOut: async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);
