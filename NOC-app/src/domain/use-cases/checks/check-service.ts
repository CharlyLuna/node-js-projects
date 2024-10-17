interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>
}

export class CheckService implements CheckServiceUseCase {
  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url)
      if (!req.ok) throw new Error(`Error on check service: ${url}`)
      console.log(`Check service ${url} is ok`)
      return true
    } catch (err) {
      console.log({ error: err })
      return false
    }
  }
}
