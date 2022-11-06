import create from 'zustand';
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
export const usePermission = create<PermissionStore>((set, get) => ({
  permissionAllow: initialStateAllow,
  permissionInfo: initialStateInfo,
  setAllow: v =>
    set(() => ({
      permissionAllow: v,
    })),
  getState: () => get(),
}));
