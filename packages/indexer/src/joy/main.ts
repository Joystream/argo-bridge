import { handleJoyBridgeEvents } from "./argoBridge"
import { Event, processor } from "./processor"
import { TypeormDatabase } from "@subsquid/typeorm-store"

processor.run(
  new TypeormDatabase({ supportHotBlocks: true, stateSchema: "joy_processor" }),
  async (ctx) => {
    const bridgeEvents: Event[] = []
    for (let block of ctx.blocks) {
      for (let event of block.events) {
        const [section] = event.name.split(".")
        if (section === "ArgoBridge") {
          bridgeEvents.push(event)
        }
      }
    }

    if (bridgeEvents.length > 0) {
      await handleJoyBridgeEvents(bridgeEvents, ctx)
    }
  },
)
