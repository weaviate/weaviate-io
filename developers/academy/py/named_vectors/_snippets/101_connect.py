# DockerInstantiation
import weaviate

client = weaviate.connect_to_local()
# END DockerInstantiation

client.close()

# DockerAPIKeyInstantiation
import weaviate
import os

headers = {
    "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")
}  # Replace with your own API keys

client = weaviate.connect_to_local(headers=headers)
# END DockerAPIKeyInstantiation

# PollLiveness
assert client.is_live()  # This will raise an exception if the client is not live
# END PollLiveness


# GetMeta
import json

metainfo = client.get_meta()
print(json.dumps(metainfo, indent=2))  # Print the meta information in a readable format
# END GetMeta


"""
# OutputGetMeta
{
  "hostname": "http://[::]:8080",
  "modules": {
    "generative-openai": {
      "documentationHref": "https://platform.openai.com/docs/api-reference/completions",
      "name": "Generative Search - OpenAI"
    },
    "multi2vec-clip": {
      "clip_model": {
        "_commit_hash": null,
        "_name_or_path": "/root/.cache/torch/sentence_transformers/sentence-transformers_clip-ViT-B-32/0_CLIPModel",
        "add_cross_attention": false,
        "architectures": [
          "CLIPModel"
        ],
        "bad_words_ids": null,
        "begin_suppress_tokens": null,
        "bos_token_id": null,
        "chunk_size_feed_forward": 0,
        "cross_attention_hidden_size": null,
        "decoder_start_token_id": null,
        "diversity_penalty": 0,
        "do_sample": false,
        "early_stopping": false,
        "encoder_no_repeat_ngram_size": 0,
        "eos_token_id": null,
        "exponential_decay_length_penalty": null,
        "finetuning_task": null,
        "forced_bos_token_id": null,
        "forced_eos_token_id": null,
        "id2label": {
          "0": "LABEL_0",
          "1": "LABEL_1"
        },
        "initializer_factor": 1,
        "is_decoder": false,
        "is_encoder_decoder": false,
        "label2id": {
          "LABEL_0": 0,
          "LABEL_1": 1
        },
        "length_penalty": 1,
        "logit_scale_init_value": 2.6592,
        "max_length": 20,
        "min_length": 0,
        "model_type": "clip",
        "no_repeat_ngram_size": 0,
        "num_beam_groups": 1,
        "num_beams": 1,
        "num_return_sequences": 1,
        "output_attentions": false,
        "output_hidden_states": false,
        "output_scores": false,
        "pad_token_id": null,
        "prefix": null,
        "problem_type": null,
        "projection_dim": 512,
        "pruned_heads": {},
        "remove_invalid_values": false,
        "repetition_penalty": 1,
        "return_dict": true,
        "return_dict_in_generate": false,
        "sep_token_id": null,
        "suppress_tokens": null,
        "task_specific_params": null,
        "temperature": 1,
        "text_config": {
          "_name_or_path": "",
          "add_cross_attention": false,
          "architectures": null,
          "attention_dropout": 0,
          "bad_words_ids": null,
          "begin_suppress_tokens": null,
          "bos_token_id": 0,
          "chunk_size_feed_forward": 0,
          "cross_attention_hidden_size": null,
          "decoder_start_token_id": null,
          "diversity_penalty": 0,
          "do_sample": false,
          "dropout": 0,
          "early_stopping": false,
          "encoder_no_repeat_ngram_size": 0,
          "eos_token_id": 2,
          "exponential_decay_length_penalty": null,
          "finetuning_task": null,
          "forced_bos_token_id": null,
          "forced_eos_token_id": null,
          "gradient_checkpointing": false,
          "hidden_act": "quick_gelu",
          "hidden_size": 512,
          "id2label": {
            "0": "LABEL_0",
            "1": "LABEL_1"
          },
          "initializer_factor": 1,
          "initializer_range": 0.02,
          "intermediate_size": 2048,
          "is_decoder": false,
          "is_encoder_decoder": false,
          "label2id": {
            "LABEL_0": 0,
            "LABEL_1": 1
          },
          "layer_norm_eps": 1e-05,
          "length_penalty": 1,
          "max_length": 20,
          "max_position_embeddings": 77,
          "min_length": 0,
          "model_type": "clip_text_model",
          "no_repeat_ngram_size": 0,
          "num_attention_heads": 8,
          "num_beam_groups": 1,
          "num_beams": 1,
          "num_hidden_layers": 12,
          "num_return_sequences": 1,
          "output_attentions": false,
          "output_hidden_states": false,
          "output_scores": false,
          "pad_token_id": 1,
          "prefix": null,
          "problem_type": null,
          "projection_dim": 512,
          "pruned_heads": {},
          "remove_invalid_values": false,
          "repetition_penalty": 1,
          "return_dict": true,
          "return_dict_in_generate": false,
          "sep_token_id": null,
          "suppress_tokens": null,
          "task_specific_params": null,
          "temperature": 1,
          "tf_legacy_loss": false,
          "tie_encoder_decoder": false,
          "tie_word_embeddings": true,
          "tokenizer_class": null,
          "top_k": 50,
          "top_p": 1,
          "torch_dtype": null,
          "torchscript": false,
          "transformers_version": "4.30.2",
          "typical_p": 1,
          "use_bfloat16": false,
          "vocab_size": 49408
        },
        "tf_legacy_loss": false,
        "tie_encoder_decoder": false,
        "tie_word_embeddings": true,
        "tokenizer_class": null,
        "top_k": 50,
        "top_p": 1,
        "torch_dtype": "torch.float32",
        "torchscript": false,
        "transformers_version": null,
        "typical_p": 1,
        "use_bfloat16": false,
        "vision_config": {
          "_name_or_path": "",
          "add_cross_attention": false,
          "architectures": null,
          "attention_dropout": 0,
          "bad_words_ids": null,
          "begin_suppress_tokens": null,
          "bos_token_id": null,
          "chunk_size_feed_forward": 0,
          "cross_attention_hidden_size": null,
          "decoder_start_token_id": null,
          "diversity_penalty": 0,
          "do_sample": false,
          "dropout": 0,
          "early_stopping": false,
          "encoder_no_repeat_ngram_size": 0,
          "eos_token_id": null,
          "exponential_decay_length_penalty": null,
          "finetuning_task": null,
          "forced_bos_token_id": null,
          "forced_eos_token_id": null,
          "gradient_checkpointing": false,
          "hidden_act": "quick_gelu",
          "hidden_size": 768,
          "id2label": {
            "0": "LABEL_0",
            "1": "LABEL_1"
          },
          "image_size": 224,
          "initializer_factor": 1,
          "initializer_range": 0.02,
          "intermediate_size": 3072,
          "is_decoder": false,
          "is_encoder_decoder": false,
          "label2id": {
            "LABEL_0": 0,
            "LABEL_1": 1
          },
          "layer_norm_eps": 1e-05,
          "length_penalty": 1,
          "max_length": 20,
          "min_length": 0,
          "model_type": "clip_vision_model",
          "no_repeat_ngram_size": 0,
          "num_attention_heads": 12,
          "num_beam_groups": 1,
          "num_beams": 1,
          "num_channels": 3,
          "num_hidden_layers": 12,
          "num_return_sequences": 1,
          "output_attentions": false,
          "output_hidden_states": false,
          "output_scores": false,
          "pad_token_id": null,
          "patch_size": 32,
          "prefix": null,
          "problem_type": null,
          "projection_dim": 512,
          "pruned_heads": {},
          "remove_invalid_values": false,
          "repetition_penalty": 1,
          "return_dict": true,
          "return_dict_in_generate": false,
          "sep_token_id": null,
          "suppress_tokens": null,
          "task_specific_params": null,
          "temperature": 1,
          "tf_legacy_loss": false,
          "tie_encoder_decoder": false,
          "tie_word_embeddings": true,
          "tokenizer_class": null,
          "top_k": 50,
          "top_p": 1,
          "torch_dtype": null,
          "torchscript": false,
          "transformers_version": "4.30.2",
          "typical_p": 1,
          "use_bfloat16": false
        }
      },
      "text_model": {
        "_commit_hash": null,
        "_name_or_path": "./models/text/0_CLIPModel",
        "add_cross_attention": false,
        "architectures": [
          "CLIPModel"
        ],
        "bad_words_ids": null,
        "begin_suppress_tokens": null,
        "bos_token_id": null,
        "chunk_size_feed_forward": 0,
        "cross_attention_hidden_size": null,
        "decoder_start_token_id": null,
        "diversity_penalty": 0,
        "do_sample": false,
        "early_stopping": false,
        "encoder_no_repeat_ngram_size": 0,
        "eos_token_id": null,
        "exponential_decay_length_penalty": null,
        "finetuning_task": null,
        "forced_bos_token_id": null,
        "forced_eos_token_id": null,
        "id2label": {
          "0": "LABEL_0",
          "1": "LABEL_1"
        },
        "initializer_factor": 1,
        "is_decoder": false,
        "is_encoder_decoder": false,
        "label2id": {
          "LABEL_0": 0,
          "LABEL_1": 1
        },
        "length_penalty": 1,
        "logit_scale_init_value": 2.6592,
        "max_length": 20,
        "min_length": 0,
        "model_type": "clip",
        "no_repeat_ngram_size": 0,
        "num_beam_groups": 1,
        "num_beams": 1,
        "num_return_sequences": 1,
        "output_attentions": false,
        "output_hidden_states": false,
        "output_scores": false,
        "pad_token_id": null,
        "prefix": null,
        "problem_type": null,
        "projection_dim": 512,
        "pruned_heads": {},
        "remove_invalid_values": false,
        "repetition_penalty": 1,
        "return_dict": true,
        "return_dict_in_generate": false,
        "sep_token_id": null,
        "suppress_tokens": null,
        "task_specific_params": null,
        "temperature": 1,
        "text_config": {
          "_name_or_path": "",
          "add_cross_attention": false,
          "architectures": null,
          "attention_dropout": 0,
          "bad_words_ids": null,
          "begin_suppress_tokens": null,
          "bos_token_id": 0,
          "chunk_size_feed_forward": 0,
          "cross_attention_hidden_size": null,
          "decoder_start_token_id": null,
          "diversity_penalty": 0,
          "do_sample": false,
          "dropout": 0,
          "early_stopping": false,
          "encoder_no_repeat_ngram_size": 0,
          "eos_token_id": 2,
          "exponential_decay_length_penalty": null,
          "finetuning_task": null,
          "forced_bos_token_id": null,
          "forced_eos_token_id": null,
          "gradient_checkpointing": false,
          "hidden_act": "quick_gelu",
          "hidden_size": 512,
          "id2label": {
            "0": "LABEL_0",
            "1": "LABEL_1"
          },
          "initializer_factor": 1,
          "initializer_range": 0.02,
          "intermediate_size": 2048,
          "is_decoder": false,
          "is_encoder_decoder": false,
          "label2id": {
            "LABEL_0": 0,
            "LABEL_1": 1
          },
          "layer_norm_eps": 1e-05,
          "length_penalty": 1,
          "max_length": 20,
          "max_position_embeddings": 77,
          "min_length": 0,
          "model_type": "clip_text_model",
          "no_repeat_ngram_size": 0,
          "num_attention_heads": 8,
          "num_beam_groups": 1,
          "num_beams": 1,
          "num_hidden_layers": 12,
          "num_return_sequences": 1,
          "output_attentions": false,
          "output_hidden_states": false,
          "output_scores": false,
          "pad_token_id": 1,
          "prefix": null,
          "problem_type": null,
          "projection_dim": 512,
          "pruned_heads": {},
          "remove_invalid_values": false,
          "repetition_penalty": 1,
          "return_dict": true,
          "return_dict_in_generate": false,
          "sep_token_id": null,
          "suppress_tokens": null,
          "task_specific_params": null,
          "temperature": 1,
          "tf_legacy_loss": false,
          "tie_encoder_decoder": false,
          "tie_word_embeddings": true,
          "tokenizer_class": null,
          "top_k": 50,
          "top_p": 1,
          "torch_dtype": null,
          "torchscript": false,
          "transformers_version": "4.30.2",
          "typical_p": 1,
          "use_bfloat16": false,
          "vocab_size": 49408
        },
        "tf_legacy_loss": false,
        "tie_encoder_decoder": false,
        "tie_word_embeddings": true,
        "tokenizer_class": null,
        "top_k": 50,
        "top_p": 1,
        "torch_dtype": "torch.float32",
        "torchscript": false,
        "transformers_version": null,
        "typical_p": 1,
        "use_bfloat16": false,
        "vision_config": {
          "_name_or_path": "",
          "add_cross_attention": false,
          "architectures": null,
          "attention_dropout": 0,
          "bad_words_ids": null,
          "begin_suppress_tokens": null,
          "bos_token_id": null,
          "chunk_size_feed_forward": 0,
          "cross_attention_hidden_size": null,
          "decoder_start_token_id": null,
          "diversity_penalty": 0,
          "do_sample": false,
          "dropout": 0,
          "early_stopping": false,
          "encoder_no_repeat_ngram_size": 0,
          "eos_token_id": null,
          "exponential_decay_length_penalty": null,
          "finetuning_task": null,
          "forced_bos_token_id": null,
          "forced_eos_token_id": null,
          "gradient_checkpointing": false,
          "hidden_act": "quick_gelu",
          "hidden_size": 768,
          "id2label": {
            "0": "LABEL_0",
            "1": "LABEL_1"
          },
          "image_size": 224,
          "initializer_factor": 1,
          "initializer_range": 0.02,
          "intermediate_size": 3072,
          "is_decoder": false,
          "is_encoder_decoder": false,
          "label2id": {
            "LABEL_0": 0,
            "LABEL_1": 1
          },
          "layer_norm_eps": 1e-05,
          "length_penalty": 1,
          "max_length": 20,
          "min_length": 0,
          "model_type": "clip_vision_model",
          "no_repeat_ngram_size": 0,
          "num_attention_heads": 12,
          "num_beam_groups": 1,
          "num_beams": 1,
          "num_channels": 3,
          "num_hidden_layers": 12,
          "num_return_sequences": 1,
          "output_attentions": false,
          "output_hidden_states": false,
          "output_scores": false,
          "pad_token_id": null,
          "patch_size": 32,
          "prefix": null,
          "problem_type": null,
          "projection_dim": 512,
          "pruned_heads": {},
          "remove_invalid_values": false,
          "repetition_penalty": 1,
          "return_dict": true,
          "return_dict_in_generate": false,
          "sep_token_id": null,
          "suppress_tokens": null,
          "task_specific_params": null,
          "temperature": 1,
          "tf_legacy_loss": false,
          "tie_encoder_decoder": false,
          "tie_word_embeddings": true,
          "tokenizer_class": null,
          "top_k": 50,
          "top_p": 1,
          "torch_dtype": null,
          "torchscript": false,
          "transformers_version": "4.30.2",
          "typical_p": 1,
          "use_bfloat16": false
        }
      }
    },
    "text2vec-openai": {
      "documentationHref": "https://platform.openai.com/docs/guides/embeddings/what-are-embeddings",
      "name": "OpenAI Module"
    },
  },
  "version": "1.23.9"
}
# END OutputGetMeta
"""


client.close()


# TryFinallyCloseDemo
import weaviate
import os

# END TryFinallyCloseDemo

client = weaviate.connect_to_local()

# TryFinallyCloseDemo
# Instantiate your client (not shown). e.g.:
# client = weaviate.connect_to_local()

try:
    # Work with the client here - e.g.:
    assert client.is_live()
    pass

finally:  # This will always be executed, even if an exception is raised
    client.close()  # Close the connection & release resources
# END TryFinallyCloseDemo
