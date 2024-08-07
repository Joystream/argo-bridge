import 'reflect-metadata'
import { Field, ObjectType, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'

@ObjectType()
export class SquidStatus {
  @Field(() => Number, { nullable: false })
  height!: number;

  @Field(() => Number, { nullable: false })
  finalizedHeight!: number;

  constructor(props: Partial<SquidStatus>) {
    Object.assign(this, props);
  }
}

@Resolver()
export class ProcessorStatusResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => SquidStatus)
  async baseProcessorStatus(): Promise<SquidStatus> {
    const manager = await this.tx()
    return await manager
      .query(
        `
        SELECT f.height AS "finalizedHeight",
            COALESCE(h.height, f.height) AS height
        FROM eth_processor.status AS f
        FULL JOIN
            (SELECT *
                FROM eth_processor.hot_block
                ORDER BY height DESC
                LIMIT 1) AS h ON TRUE
        WHERE f.id = 0
        `,
      )
      .then((r) => {
        const height = parseInt(r[0].height);
        const finalizedHeight = parseInt(r[0].finalizedHeight);
        return new SquidStatus({ height, finalizedHeight });
      });
  }

  @Query(() => SquidStatus)
  async joyProcessorStatus(): Promise<SquidStatus> {
    const manager = await this.tx()
    return await manager
      .query(
        `
        SELECT f.height AS "finalizedHeight",
            COALESCE(h.height, f.height) AS height
        FROM joy_processor.status AS f
        FULL JOIN
            (SELECT *
                FROM joy_processor.hot_block
                ORDER BY height DESC
                LIMIT 1) AS h ON TRUE
        WHERE f.id = 0
        `,
      )
      .then((r) => {
        const height = parseInt(r[0].height);
        const finalizedHeight = parseInt(r[0].finalizedHeight);
        return new SquidStatus({ height, finalizedHeight });
      });
  }
}
