export type ParseableSchema<DataType> = {
  safeParse(data: unknown):
    | { success: true, data: DataType }
    | { success: false, error: { issues: unknown[] } }
}