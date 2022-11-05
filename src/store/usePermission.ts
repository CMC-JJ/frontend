import createHook from 'zustand';
import create from 'zustand/vanilla';
type PermissionAllow = {
  allow: boolean;
};
type PermissionInfo = {
  location: string;
};
type PermissionStore = {
  permissionAllow: PermissionAllow;
  permissionInfo: PermissionInfo;
  setAllow: (v: PermissionAllow) => void;
  getState: () => PermissionStore;
};

const initialStateAllow: PermissionAllow = {
  allow: false,
};
const initialStateInfo: PermissionInfo = {
  location: '',
};
export const Permission = create<PermissionStore>((set, get) => ({
  permissionAllow: initialStateAllow,
  permissionInfo: initialStateInfo,
  setAllow: v =>
    set(() => ({
      permissionAllow: v,
    })),
  getState: () => get(),
}));
export const usePermission = createHook(Permission);
