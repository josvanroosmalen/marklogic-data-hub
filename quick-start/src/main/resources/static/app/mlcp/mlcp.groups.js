/* jshint camelcase: false */
(function () {

  'use strict';

  angular.module('mlcp')
    .factory('mlcpGroups', MlcpGroupsFactory);

  function MlcpGroupsFactory() {
    return {
      groups: function(entityName, flowName) {
        return [
          {
            category: 'General options',
            settings: [
              {
                label: 'Output collections',
                field: 'output_collections',
                type: 'comma-list',
                description: 'A comma separated list of collection URIs. Loaded documents are added to these collections.',
                value: entityName + ',' + flowName + ',input'
              },
              {
                label: 'Output permissions',
                field: 'output_permissions',
                type: 'comma-list',
                description: 'A comma separated list of (role,capability) pairs to apply to loaded documents. Default: The default permissions associated with the user inserting the document. Example: -output_permissions role1,read,role2,update',
                value: 'rest-reader,read,rest-writer,update'
              },
              {
                label: 'Clean Target Database Directory?',
                field: 'output_cleandir',
                type: 'boolean',
                description: 'Whether or not to delete all content in the output database directory prior to loading. Default: false.'
              },
              {
                label: 'Output URI prefix',
                field: 'output_uri_prefix',
                type: 'string',
                description: 'URI prefix to the id specified by -output_idname. Used to construct output document URIs.'
              },
              {
                label: 'Output URI suffix',
                field: 'output_uri_suffix',
                type: 'string',
                description: 'URI suffix to the id specified by -output_idname. Used to construct output document URIs.'
              },
              {
                label: 'Document type',
                field: 'document_type',
                type: 'type',
                description: 'The type of document to create when -input_file_type is documents or sequencefile. Accepted values: mixed (documents only), xml, json, text, binary. Default: mixed for documents, xml for sequencefile.',
                options: [
                  {
                    label: 'mixed (documents only)',
                    value: 'mixed'
                  },
                  {
                    label: 'xml (default for sequence file)',
                    value: 'xml'
                  },
                  {
                    label: 'json',
                    value: 'json'
                  },
                  {
                    label: 'text',
                    value: 'text'
                  },
                  {
                    label: 'binary',
                    value: 'binary'
                  }
                ]
              },
              {
                label: 'Input file Pattern',
                field: 'input_file_pattern',
                type: 'string',
                description: 'Load only input files that match this regular expression from the path(s) matched by -input_file_path. For details, see Regular Expression Syntax. Default: Load all files. This option is ignored when -input_file_type is forest.'
              },
              {
                label: 'Input files are compressed?',
                field: 'input_compressed',
                type: 'boolean',
                description: 'Whether or not the source data is compressed. Default: false.',
                placeholder: 'whether or not the source data is compressed'
              },
              {
                label: 'Input files codec',
                field: 'input_compression_codec',
                type: 'type',
                description: 'When -input_compressed is true, the code used for compression. Accepted values: zip, gzip.',
                options: [
                  {
                    label: 'zip',
                    value: 'zip'
                  },
                  {
                    label: 'gzip',
                    value: 'gzip'
                  }
                ],
                filter: {
                  field: 'input_compressed',
                  value: 'true'
                }
              },
              {
                label: 'Namespace',
                field: 'namespace',
                type: 'string',
                description: 'The default namespace for all XML documents created during loading.',
                placeholder: 'default namespace for all XML documents created during loading'
              },
              {
                label: 'XML repair level',
                field: 'xml_repair_level',
                type: 'string',
                description: 'The degree of repair to attempt on XML documents in order to create well-formed XML. Accepted values: default,full, none. Default: default, which depends on the configured MarkLogic Server default XQuery version: In XQuery 1.0 and 1.0-ml the default is none. In XQuery 0.9-ml the default is full.',
                placeholder: 'default, full, or none'
              },
              {
                label: 'Thread count',
                field: 'thread_count',
                type: 'number',
                description: 'The number of threads to spawn for concurrent loading. The total number of threads spawned by the process can be larger than this number, but this option caps the number of concurrent sessions with MarkLogic Server. Only available in local mode. Default: 4.',
                placeholder: 'default is 4'
              },
              {
                label: 'Batch size',
                field: 'batch_size',
                type: 'number',
                description: 'The number of documents to process in a single request to MarkLogic Server. This option is ignored when you use -transform_module; a transform always sets the batch size to 1. Default: 100.',
                placeholder: 'default is 100; set to 1 when transform is used'
              }
            ]
          },
          {
            category: 'Delimited text options',
            caption: 'If the selected file ends in .csv, .xls, or .xlsx, the server will assume that the input file type is \'delimited_text\'.',
            settings: [
              {
                label: 'Delimiter',
                field: 'delimiter',
                type: 'character',
                description: 'When importing content with -input_file_type delimited_text, the delimiting character. Default: comma (,).',
                placeholder: 'default is comma'
              },
              {
                label: 'URI ID',
                field: 'delimited_uri_id',
                type: 'string',
                description: 'When importing content -input_file_type delimited_text, the column name that contributes to the id portion of the URI for inserted documents. Default: The first column.',
                placeholder: 'default is first column'
              },
              {
                label: 'Generate URI?',
                field: 'generate_uri',
                type: 'boolean',
                description: 'When importing content with -input_file_type delimited_text, whether or not MarkLogic Server should automatically generate document URIs. Default: false.',
                placeholder: 'default is false for delimited_text, true for delimited_json'
              },
              {
                label: 'Delimited root name',
                field: 'delimited_root_name',
                type: 'string',
                description: 'When importing content with -input_file_type delimited_text, the localname of the document root element. Default: root.',
                placeholder: 'default is root'
              },
              {
                label: 'Split input?',
                field: 'split_input',
                type: 'boolean',
                description: 'Whether or not to divide input data into logical chunks to support more concurrency. Only supported when -input_file_type is one of the following: delimited_text. Default: false for local mode, true for distributed mode. For details, see Improving Throughput with -split_input.',
                placeholder: 'whether or not to divide input data into logical chunks to support more concurrency.'
              },
              {
                label: 'Data Type',
                field: 'data_type',
                type: 'comma-list',
                description: 'When importing content with -input_file_type delimited_text and -document_type json, use this option to specify the data type (string, number, or boolean) to give to specific fields. The option value must be a comma separated list of name,datatype pairs, such as \'a,number,b,boolean\'. Default: All fields have string type. For details, see Controlling Data Type in JSON Output.'
              }
            ]
          },
          {
            category: 'Aggregate XML options',
            settings: [
              {
                label: 'Aggregate record element',
                field: 'aggregate_record_element',
                type: 'string',
                description: 'When splitting an aggregate input file into multiple documents, the name of the element to use as the output document root. Default: The first child element under the root element.'
              },
              {
                label: 'Aggregate record namespace',
                field: 'aggregate_record_namespace',
                type: 'string',
                description: 'The namespace of the element specificed by -aggregate_record_element_name. Default: No namespace.'
              },
              {
                label: 'URI ID',
                field: 'aggregate_uri_id',
                type: 'string',
                description: 'When splitting an aggregate input file into multiple documents, the element or attribute name within the document root to use as the document URI. Default: In local mode, hashcode-seqnum, where the hashcode is derived from the split number; in distribute mode, taskid-seqnum.',
                placeholder: 'name of the element from which to derive the document URI'
              }
            ]
          },
          {
            category: 'Transform options',
            settings: [
              {
                label: 'Transform module',
                field: 'transform_module',
                type: 'string',
                description: 'The path in the modules database or modules directory of a custom content transformation function installed on MarkLogic Server. This option is required to enable a custom transformation. For details, see Transforming Content During Ingestion.',
                value: '/com.marklogic.hub/mlcp-flow-transform.xqy',
                readOnly: true
              },
              {
                label: 'Transform namespace',
                field: 'transform_namespace',
                type: 'string',
                description: 'The namespace URI of the custom content transformation function named by -transform_function. Ignored if-transform_module is not specified. Default: no namespace. For details, see Transforming Content During Ingestion.',
                value: 'http://marklogic.com/data-hub/mlcp-flow-transform',
                readOnly: true
              },
              {
                label: 'Transform param',
                field: 'transform_param',
                type: 'string',
                description: 'Optional extra data to pass through to a custom transformation function. Ignored if -transform_module is not specified. Default: no namespace. For details, see Transforming Content During Ingestion.',
                value: '<params><entity-name>' + entityName + '</entity-name><flow-name>' + flowName + '</flow-name><flow-type>input</flow-type></params>',
                readOnly: true
              }
            ]
          }
        ];
      }
    };
  }
})();
