-- ==============================================================================
-- V1__init_extensions.sql
-- Initialize PostgreSQL extensions required for UUID generation and vector embeddings
-- ==============================================================================

-- Enable UUID generation function gen_random_uuid() / uuid_generate_v4()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgvector extension for high-dimensional semantic search
CREATE EXTENSION IF NOT EXISTS vector;
