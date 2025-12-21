export type AuthActionReturn = Promise<{
  success: boolean;
  error: { message: string; code?: string } | null;
}>;
