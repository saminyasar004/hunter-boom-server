import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  InternalServerErrorException,
  BadRequestException,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AgentService } from "./agent.service";
import { CreateAgentDto } from "./dto/create-agent.dto";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiConsumes,
} from "@nestjs/swagger";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { unlink, unlinkSync } from "fs";
import { UpdateAgentDto } from "./dto/update-agent.dto";
import { generateJWTToken } from "@/lib";
import { ResponseProps } from "@/interfaces";

/**
 * Controller for managing agent-related API endpoints.
 */
@ApiTags("agents")
@Controller("api/agents")
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Get()
  @ApiOperation({ summary: "Get all agents" })
  @ApiResponse({
    status: 200,
    description: "Agents retrieved successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 200 },
        message: {
          type: "string",
          example: "Agents retrieved successfully",
        },
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number", example: 1 },
              code: { type: "string", example: "AGT001" },
              agentName: { type: "string", example: "Agent Name" },
              file: {
                type: "string",
                example: "hunter_upload-1629876543210.jpg",
                nullable: true,
              },
              contactNumber: { type: "string", example: "+1234567890" },
              addContactNumber: { type: "string", example: "+0987654321" },
              address: { type: "string", example: "123 Main St" },
              addressPostalCode: { type: "string", example: "12345" },
              addressCity: { type: "string", example: "New York" },
              addressState: { type: "string", example: "NY" },
              username: { type: "string", example: "agent123" },
              password: { type: "string", example: "[hidden]" },
              agentGroupId: { type: "number", example: 1 },
              isDeleted: { type: "boolean", example: false },
              accountBook: { type: "string", example: "ACC001" },
              creditLimit: { type: "string", example: "1000.00" },
              creditTerm: { type: "string", example: "30 days" },
              status: { type: "string", example: "active" },
              isTopLevel: { type: "number", example: 1 },
              uplineAgentId: { type: "number", example: null },
              createdAt: {
                type: "string",
                format: "date-time",
                example: "2025-08-22T12:30:00Z",
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                example: "2025-08-22T12:30:00Z",
              },
            },
          },
        },
      },
    },
  })
  async getAllAgents() {
    try {
      const agents = await this.agentService.getAllAgents();

      if (!agents) {
        return {
          status: 500,
          message: "Internal server error",
        };
      }
      return {
        status: 200,
        message: "Agents retrieved successfully",
        data: agents,
      };
    } catch (err: any) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }

  @Get("/:agentId")
  @ApiOperation({ summary: "Get an agent by ID" })
  @ApiResponse({
    status: 200,
    description: "Agent retrieved successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 200 },
        message: { type: "string", example: "Agent retrieved successfully" },
        data: {
          type: "object",
          properties: {
            id: { type: "number", example: 1 },
            code: { type: "string", example: "AGT001" },
            agentName: { type: "string", example: "Agent Name" },
            file: {
              type: "string",
              example: "hunter_upload-1629876543210.jpg",
              nullable: true,
            },
            contactNumber: { type: "string", example: "+1234567890" },
            addContactNumber: { type: "string", example: "+0987654321" },
            address: { type: "string", example: "123 Main St" },
            addressPostalCode: { type: "string", example: "12345" },
            addressCity: { type: "string", example: "New York" },
            addressState: { type: "string", example: "NY" },
            username: { type: "string", example: "agent123" },
            password: { type: "string", example: "[hidden]" },
            agentGroupId: { type: "number", example: 1 },
            isDeleted: { type: "boolean", example: false },
            accountBook: { type: "string", example: "ACC001" },
            creditLimit: { type: "string", example: "1000.00" },
            creditTerm: { type: "string", example: "30 days" },
            status: { type: "string", example: "active" },
            isTopLevel: { type: "number", example: 1 },
            uplineAgentId: { type: "number", example: null },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-08-22T12:30:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-08-22T12:30:00Z",
            },
          },
        },
      },
    },
  })
  async getAgentById(@Param("agentId") agentId: number) {
    try {
      const agent = await this.agentService.findAgentById(agentId);

      if (!agent) {
        return {
          status: 404,
          message: "Agent not found",
        };
      }

      return {
        status: 200,
        message: "Agent retrieved successfully",
        data: agent,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }

  @Post("create")
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @ApiOperation({ summary: "Create a new agent with an optional file upload" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Agent data and optional file file (multipart/form-data)",
    type: CreateAgentDto,
    schema: {
      type: "object",
      properties: {
        code: {
          type: "string",
          example: "AGT001",
          description: "The unique code for the agent",
        },
        agentName: {
          type: "string",
          example: "Agent Name",
          description: "The name of the agent",
        },
        contactNumber: {
          type: "string",
          example: "+1234567890",
          description: "The primary contact number",
        },
        addContactNumber: {
          type: "string",
          example: "+0987654321",
          description: "Additional contact number",
        },
        address: {
          type: "string",
          example: "123 Main St",
          description: "The street address",
        },
        addressPostalCode: {
          type: "string",
          example: "12345",
          description: "The postal code",
        },
        addressCity: {
          type: "string",
          example: "New York",
          description: "The city",
        },
        addressState: {
          type: "string",
          example: "NY",
          description: "The state or region",
        },
        username: {
          type: "string",
          example: "agent123",
          description: "The username for the account",
        },
        password: {
          type: "string",
          example: "Password@123",
          description:
            "The password (min 8 chars, with letters, numbers and special characters)",
        },
        agentGroupId: {
          type: "number",
          example: 1,
          description: "The ID of the agent group",
        },
        accountBook: {
          type: "string",
          example: "ACC001",
          description: "The account book identifier",
        },
        creditLimit: {
          type: "string",
          example: "1000.00",
          description: "The credit limit (currency amount)",
        },
        creditTerm: {
          type: "string",
          example: "30 days",
          description: "The credit term",
        },
        status: {
          type: "string",
          enum: ["active", "inactive"],
          description: "The status of the agent",
          example: "active",
        },
        isTopLevel: {
          type: "number",
          example: 1,
          description: "The status of the agent",
        },
        uplineAgentId: {
          type: "number",
          example: null,
          description: "The status of the agent",
        },
        file: {
          type: "string",
          format: "binary",
          description: "Optional file (JPEG, PNG, PDF or anything, max 5MB)",
        },
      },
      required: [
        "code",
        "agentName",
        "contactNumber",
        "addContactNumber",
        "address",
        "addressPostalCode",
        "addressCity",
        "addressState",
        "username",
        "password",
        "agentGroupId",
        "accountBook",
        "creditLimit",
        "creditTerm",
        "status",
        "isTopLevel",
        "uplineAgentId",
      ],
    },
  })
  @ApiResponse({
    status: 201,
    description: "Agent created successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 201 },
        message: { type: "string", example: "Agent created successfully" },
        data: {
          type: "object",
          properties: {
            agentId: { type: "number", example: 1 },
            code: { type: "string", example: "AGT001" },
            agentName: { type: "string", example: "Agent Name" },
            file: {
              type: "string",
              example: "hunter_upload-1629876543210.jpg",
              nullable: true,
            },
            contactNumber: { type: "string", example: "+1234567890" },
            addContactNumber: { type: "string", example: "+0987654321" },
            address: { type: "string", example: "123 Main St" },
            addressPostalCode: { type: "string", example: "12345" },
            addressCity: { type: "string", example: "New York" },
            addressState: { type: "string", example: "NY" },
            username: { type: "string", example: "agent123" },
            password: { type: "string", example: "[hidden]" },
            agentGroupId: { type: "number", example: 1 },
            isDeleted: { type: "boolean", example: false },
            accountBook: { type: "string", example: "ACC001" },
            creditLimit: { type: "string", example: "1000.00" },
            creditTerm: { type: "string", example: "30 days" },
            status: { type: "string", example: "active" },
            isTopLevel: { type: "number", example: 1 },
            uplineAgentId: { type: "number", example: null },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-08-22T12:30:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-08-22T12:30:00Z",
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data or file",
    schema: {
      type: "object",
      properties: {
        statusCode: { type: "number", example: 400 },
        message: {
          type: "array",
          items: { type: "string" },
          example: [
            "Email must be a valid email address",
            "Invalid file type. Only JPEG, PNG, and GIF are allowed.",
          ],
        },
        error: { type: "string", example: "Bad Request" },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 500 },
        message: { type: "string", example: "Internal server error" },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: join(__dirname, "../../", "uploads"),
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `hunter_upload_${uniqueSuffix}${ext}`);
        },
      }),
      // fileFilter: (req, file, callback) => {},
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    }),
  )
  async createAgent(
    @Body() createAgentDto: CreateAgentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      const fileName = file ? file.filename : undefined;
      const agent = await this.agentService.createAgent(
        createAgentDto,
        fileName,
      );

      if (!agent) {
        return {
          status: 500,
          message: "Internal server error",
        };
      }

      return {
        status: 201,
        message: "Agent created successfully",
        data: { ...agent, password: "[hidden]" },
      };
    } catch (err: any) {
      console.error("Error creating agent:", err.message, err.stack);

      // cleanup the uploaded file
      if (file?.filename) {
        unlinkSync(join(__dirname, "../../", "uploads", file?.filename));
      }
      if (err instanceof BadRequestException) {
        throw err;
      }
      if (err.message.includes("Invalid file type")) {
        throw new BadRequestException("Invalid file.");
      }
      if (err.name === "SequelizeForeignKeyConstraintError") {
        throw new BadRequestException("Invalid agent group ID");
      }
      throw new InternalServerErrorException(
        "Failed to create agent: " + err.message,
      );
    }
  }

  @Put(":agentId")
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @ApiOperation({ summary: "Update an agent with an optional file upload" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Agent data and optional file (multipart/form-data)",
    type: UpdateAgentDto,
    schema: {
      type: "object",
      properties: {
        code: {
          type: "string",
          example: "AGT001",
          description: "The unique code for the agent",
        },
        agentName: {
          type: "string",
          example: "Agent Name",
          description: "The name of the agent",
        },
        companyName: {
          type: "string",
          example: "Acme Corp",
          description: "The company name of the agent",
        },
        contactNumber: {
          type: "string",
          example: "+1234567890",
          description: "The primary contact number",
        },
        addContactNumber: {
          type: "string",
          example: "+0987654321",
          description: "Additional contact number",
        },
        address: {
          type: "string",
          example: "123 Main St",
          description: "The street address",
        },
        addressPostalCode: {
          type: "string",
          example: "12345",
          description: "The postal code",
        },
        addressCity: {
          type: "string",
          example: "New York",
          description: "The city",
        },
        addressState: {
          type: "string",
          example: "NY",
          description: "The state or region",
        },
        username: {
          type: "string",
          example: "agent123",
          description: "The username for the account",
        },
        name: {
          type: "string",
          example: "Agent Name",
          description: "The name for the agent's account",
        },
        password: {
          type: "string",
          example: "Password@123",
          description: "The password (optional, only updated if non-empty)",
        },
        agentGroupId: {
          type: "number",
          example: 1,
          description: "The ID of the agent group",
        },
        accountBook: {
          type: "string",
          example: "ACC001",
          description: "The account book identifier",
        },
        creditLimit: {
          type: "string",
          example: "1000.00",
          description: "The credit limit (currency amount)",
        },
        creditTerm: {
          type: "string",
          example: "30 days",
          description: "The credit term",
        },
        status: {
          type: "string",
          enum: ["active", "inactive"],
          description: "The status of the agent",
          example: "active",
        },
        isTopLevel: {
          type: "number",
          example: 1,
          description: "Whether the agent is top-level",
        },
        uplineAgentId: {
          type: "number",
          example: null,
          description: "The ID of the upline agent",
        },
        file: {
          type: "string",
          format: "binary",
          description: "Optional file (JPEG, PNG, PDF, max 5MB)",
        },
      },
      required: [
        "code",
        "agentName",
        "companyName",
        "contactNumber",
        "addContactNumber",
        "address",
        "addressPostalCode",
        "addressCity",
        "addressState",
        "username",
        "name",
        "agentGroupId",
        "accountBook",
        "creditLimit",
        "creditTerm",
        "status",
      ],
    },
  })
  @ApiResponse({
    status: 200,
    description: "Agent updated successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 200 },
        message: { type: "string", example: "Agent updated successfully" },
        token: { type: "string", example: "jwt.token.here" },
        data: {
          type: "object",
          properties: {
            agentId: { type: "number", example: 1 },
            code: { type: "string", example: "AGT001" },
            agentName: { type: "string", example: "Agent Name" },
            file: {
              type: "string",
              example: "hunter_upload-1629876543210.jpg",
              nullable: true,
            },
            contactNumber: { type: "string", example: "+1234567890" },
            addContactNumber: { type: "string", example: "+0987654321" },
            address: { type: "string", example: "123 Main St" },
            addressPostalCode: { type: "string", example: "12345" },
            addressCity: { type: "string", example: "New York" },
            addressState: { type: "string", example: "NY" },
            username: { type: "string", example: "agent123" },
            name: { type: "string", example: "Agent Name" },
            password: { type: "string", example: "[hidden]" },
            agentGroupId: { type: "number", example: 1 },
            isDeleted: { type: "boolean", example: false },
            accountBook: { type: "string", example: "ACC001" },
            creditLimit: { type: "string", example: "1000.00" },
            creditTerm: { type: "string", example: "30 days" },
            status: { type: "string", example: "active" },
            isTopLevel: { type: "number", example: 1 },
            uplineAgentId: { type: "number", example: null },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-08-22T12:30:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-08-22T12:30:00Z",
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data or file",
    schema: {
      type: "object",
      properties: {
        statusCode: { type: "number", example: 400 },
        message: {
          type: "array",
          items: { type: "string" },
          example: [
            "Email must be a valid email address",
            "Invalid file type. Only JPEG, PNG, and GIF are allowed.",
          ],
        },
        error: { type: "string", example: "Bad Request" },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 500 },
        message: { type: "string", example: "Internal server error" },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: join(__dirname, "../../", "uploads"),
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `hunter_upload_${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    }),
  )
  async updateAgent(
    @Param("agentId") agentId: number,
    @Body() updateAgentDto: UpdateAgentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      const isAgentExist = await this.agentService.findAgentById(agentId);

      if (!isAgentExist) {
        if (file?.filename) {
          unlinkSync(join(__dirname, "../../", "uploads", file.filename));
        }
        return {
          status: 400,
          message: "Invalid agent ID",
        };
      }

      const fileName = file ? file.filename : undefined;
      const updatedAgent = await this.agentService.editAgent(
        agentId,
        updateAgentDto,
        fileName,
      );

      if (!updatedAgent) {
        if (file?.filename) {
          unlinkSync(join(__dirname, "../../", "uploads", file.filename));
        }
        return {
          status: 500,
          message: "Internal server error",
        };
      }

      const { password, ...responseData } = updatedAgent;

      const token = generateJWTToken(responseData);

      return {
        status: 200,
        message: "Agent updated successfully",
        token,
        data: responseData,
      };
    } catch (err: any) {
      console.error("Error updating agent:", err.message, err.stack);

      // Cleanup the uploaded file
      if (file?.filename) {
        unlinkSync(join(__dirname, "../../", "uploads", file.filename));
      }
      if (err instanceof BadRequestException) {
        throw err;
      }
      if (err.message.includes("Invalid file type")) {
        throw new BadRequestException("Invalid file.");
      }
      if (err.name === "SequelizeForeignKeyConstraintError") {
        throw new BadRequestException(
          "Invalid agent group ID or upline agent ID",
        );
      }
      throw new InternalServerErrorException(
        "Failed to update agent: " + err.message,
      );
    }
  }

  // @Put("/:agentId")
  // @ApiOperation({ summary: "Update an agent" })
  // @ApiBody({ type: UpdateAgentDto })
  // @ApiResponse({
  //   status: 200,
  //   description: "Agent updated successfully",
  //   schema: {
  //     type: "object",
  //     properties: {
  //       status: { type: "number", example: 200 },
  //       message: { type: "string", example: "Agent updated successfully" },
  //       data: {
  //         type: "object",
  //         properties: {
  //           agentId: { type: "number", example: 1 },
  //           code: { type: "string", example: "AGT001" },
  //           file: {
  //             type: "string",
  //             example: "hunter_upload-1629876543210.jpg",
  //             nullable: true,
  //           },
  //           contactNumber: { type: "string", example: "+1234567890" },
  //           addContactNumber: { type: "string", example: "+0987654321" },
  //           address: { type: "string", example: "123 Main St" },
  //           addressPostalCode: { type: "string", example: "12345" },
  //           addressCity: { type: "string", example: "New York" },
  //           addressState: { type: "string", example: "NY" },
  //           username: { type: "string", example: "agent123" },
  //           password: { type: "string", example: "[hidden]" },
  //           agentGroupId: { type: "number", example: 1 },
  //           isDeleted: { type: "boolean", example: false },
  //           accountBook: { type: "string", example: "ACC001" },
  //           creditLimit: { type: "string", example: "1000.00" },
  //           creditTerm: { type: "string", example: "30 days" },
  //           status: { type: "string", example: "active" },
  //           isTopLevel: { type: "number", example: 1 },
  //           uplineAgentId: { type: "number", example: null },
  //           createdAt: {
  //             type: "string",
  //             format: "date-time",
  //             example: "2025-08-22T12:30:00Z",
  //           },
  //           updatedAt: {
  //             type: "string",
  //             format: "date-time",
  //             example: "2025-08-22T12:30:00Z",
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: "Invalid input data or file",
  //   schema: {
  //     type: "object",
  //     properties: {
  //       statusCode: { type: "number", example: 400 },
  //       message: {
  //         type: "array",
  //         items: { type: "string" },
  //         example: [
  //           "Email must be a valid email address",
  //           "Invalid file type. Only JPEG, PNG, and GIF are allowed.",
  //         ],
  //       },
  //       error: { type: "string", example: "Bad Request" },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: "Internal server error",
  //   schema: {
  //     type: "object",
  //     properties: {
  //       status: { type: "number", example: 500 },
  //       message: { type: "string", example: "Internal server error" },
  //     },
  //   },
  // })
  // async updateAgent(
  //   @Param("agentId") agentId: number,
  //   @Body() updateAgentDto: UpdateAgentDto,
  // ) {
  //   try {
  //     const isAgentExist = await this.agentService.findAgentById(agentId);

  //     if (!isAgentExist) {
  //       return {
  //         status: 400,
  //         message: "Invalid agent ID",
  //       };
  //     }

  //     const updatedAgent = await this.agentService.editAgent(
  //       agentId,
  //       updateAgentDto,
  //     );

  //     if (!updatedAgent) {
  //       return {
  //         status: 500,
  //         message: "Internal server error",
  //       };
  //     }

  //     const { password, ...responseData } = updatedAgent;

  //     const token = generateJWTToken(responseData);

  //     return {
  //       status: 200,
  //       message: "Agent updated successfully",
  //       token,
  //       data: responseData,
  //     };
  //   } catch (err) {
  //     console.log(err);
  //     return {
  //       status: 500,
  //       message: "Internal server error",
  //     };
  //   }
  // }

  @Delete("/:agentId")
  @ApiOperation({ summary: "Delete an agent" })
  @ApiResponse({
    status: 200,
    description: "Agent deleted successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 200 },
        message: { type: "string", example: "Agent deleted successfully" },
        data: {
          type: "object",
          properties: {
            agentId: { type: "number", example: 1 },
            code: { type: "string", example: "AGT001" },
            agentName: { type: "string", example: "Agent Name" },
            file: {
              type: "string",
              example: "hunter_upload-1629876543210.jpg",
              nullable: true,
            },
            contactNumber: { type: "string", example: "+1234567890" },
            addContactNumber: { type: "string", example: "+0987654321" },
            address: { type: "string", example: "123 Main St" },
            addressPostalCode: { type: "string", example: "12345" },
            addressCity: { type: "string", example: "New York" },
            addressState: { type: "string", example: "NY" },
            username: { type: "string", example: "agent123" },
            password: { type: "string", example: "[hidden]" },
            agentGroupId: { type: "number", example: 1 },
            isDeleted: { type: "boolean", example: false },
            accountBook: { type: "string", example: "ACC001" },
            creditLimit: { type: "string", example: "1000.00" },
            creditTerm: { type: "string", example: "30 days" },
            status: { type: "string", example: "active" },
            isTopLevel: { type: "number", example: 1 },
            uplineAgentId: { type: "number", example: null },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-08-22T12:30:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-08-22T12:30:00Z",
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data or file",
    schema: {
      type: "object",
      properties: {
        statusCode: { type: "number", example: 400 },
        message: {
          type: "array",
          items: { type: "string" },
          example: [
            "Email must be a valid email address",
            "Invalid file type. Only JPEG, PNG, and GIF are allowed.",
          ],
        },
        error: { type: "string", example: "Bad Request" },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 500 },
        message: { type: "string", example: "Internal server error" },
      },
    },
  })
  async deleteAgent(@Param("agentId") agentId: number): Promise<ResponseProps> {
    try {
      const isAgentExist = await this.agentService.findAgentById(agentId);

      if (!isAgentExist) {
        return {
          status: 400,
          message: "Invalid agent ID",
        };
      }

      const deletedAgent = await this.agentService.deleteAgent(agentId);

      if (!deletedAgent) {
        return {
          status: 500,
          message: "Internal server error",
        };
      }

      return {
        status: 200,
        message: "Agent deleted successfully",
        data: deletedAgent,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
}
