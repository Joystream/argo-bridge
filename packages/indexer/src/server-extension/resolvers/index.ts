import 'reflect-metadata'
import { Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'

@Resolver()
export class ProcessorStatusResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => Number)
  async baseProcessorStatus(): Promise<number> {
    const manager = await this.tx()
    const result = await manager.query(`SELECT height FROM eth_processor.status WHERE id = 0`)
    return result[0]?.height
  }

  @Query(() => Number)
  async joyProcessorStatus(): Promise<number> {
    const manager = await this.tx()
    const result = await manager.query(`SELECT height FROM joy_processor.status WHERE id = 0`)
    return result[0]?.height
  }
}
