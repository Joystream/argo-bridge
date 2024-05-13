module.exports = class Data1715596861552 {
    name = 'Data1715596861552'

    async up(db) {
        await db.query(`CREATE TABLE "ethereum_requested_transfer" ("id" character varying NOT NULL, "block" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "tx_hash" text NOT NULL, "requester" text NOT NULL, "joy_dest_account" text NOT NULL, "amount" numeric NOT NULL, "fee_paid" numeric NOT NULL, "request_block" integer NOT NULL, CONSTRAINT "PK_a17d6837da0fd576126274cdb94" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_55b1d92ba173f684a4584ec3db" ON "ethereum_requested_transfer" ("tx_hash") `)
        await db.query(`CREATE INDEX "IDX_550a8b2376eb68b88681679df1" ON "ethereum_requested_transfer" ("requester") `)
        await db.query(`CREATE INDEX "IDX_2947d3ee46e4fe785f0919dacf" ON "ethereum_requested_transfer" ("joy_dest_account") `)
        await db.query(`CREATE TABLE "ethereum_completed_transfer" ("id" character varying NOT NULL, "joy_id" text NOT NULL, "block" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "tx_hash" text NOT NULL, "eth_dest_address" text NOT NULL, "amount" numeric NOT NULL, CONSTRAINT "PK_73327fc3b5c9186ba00afac0f5a" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_db9245128b4e22aab98c297902" ON "ethereum_completed_transfer" ("tx_hash") `)
        await db.query(`CREATE INDEX "IDX_6b37d3f3ce7fb564fd953d0f68" ON "ethereum_completed_transfer" ("eth_dest_address") `)
        await db.query(`CREATE TABLE "evm_bridge_config" ("id" character varying NOT NULL, "status" character varying(6) NOT NULL, "bridging_fee" numeric NOT NULL, "minting_limits" jsonb NOT NULL, CONSTRAINT "PK_8d0d9be7b260dfb3aa0a9592efa" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "evm_bridge_fees_withdrawn" ("id" character varying NOT NULL, "block" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "tx_hash" text NOT NULL, "chain_id" text NOT NULL, "destination" text NOT NULL, "amount" numeric NOT NULL, CONSTRAINT "PK_2e4aafb5a2998ebb0a887786903" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_d9a0f4c40b43a41b10dddb6ae5" ON "evm_bridge_fees_withdrawn" ("tx_hash") `)
        await db.query(`CREATE INDEX "IDX_52e98eefbc7b8aef6839449598" ON "evm_bridge_fees_withdrawn" ("chain_id") `)
        await db.query(`CREATE INDEX "IDX_0335c052caf4bc43dfa4d13283" ON "evm_bridge_fees_withdrawn" ("destination") `)
        await db.query(`CREATE TABLE "evm_timelock_call" ("id" character varying NOT NULL, "status" character varying(9) NOT NULL, "created_at_block" integer NOT NULL, "created_at_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "created_tx_hash" text NOT NULL, "executed_at_block" integer, "executed_at_timestamp" TIMESTAMP WITH TIME ZONE, "executed_tx_hash" text, "cancelled_at_block" integer, "cancelled_at_timestamp" TIMESTAMP WITH TIME ZONE, "cancelled_tx_hash" text, "call_target" text NOT NULL, "call_value" numeric NOT NULL, "call_data" text NOT NULL, "call_signature" text, "call_args" text, "predecessor" text, "salt" text, "delay_done_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_b396eb1dbdce864526244730a88" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "ethereum_requested_transfer"`)
        await db.query(`DROP INDEX "public"."IDX_55b1d92ba173f684a4584ec3db"`)
        await db.query(`DROP INDEX "public"."IDX_550a8b2376eb68b88681679df1"`)
        await db.query(`DROP INDEX "public"."IDX_2947d3ee46e4fe785f0919dacf"`)
        await db.query(`DROP TABLE "ethereum_completed_transfer"`)
        await db.query(`DROP INDEX "public"."IDX_db9245128b4e22aab98c297902"`)
        await db.query(`DROP INDEX "public"."IDX_6b37d3f3ce7fb564fd953d0f68"`)
        await db.query(`DROP TABLE "evm_bridge_config"`)
        await db.query(`DROP TABLE "evm_bridge_fees_withdrawn"`)
        await db.query(`DROP INDEX "public"."IDX_d9a0f4c40b43a41b10dddb6ae5"`)
        await db.query(`DROP INDEX "public"."IDX_52e98eefbc7b8aef6839449598"`)
        await db.query(`DROP INDEX "public"."IDX_0335c052caf4bc43dfa4d13283"`)
        await db.query(`DROP TABLE "evm_timelock_call"`)
    }
}
