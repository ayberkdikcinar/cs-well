/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               path:
 *                 type: string
 *     KeySchema:
 *       type: string
 *       description: The key to increment or query (will be formatted to lowercase and trimmed)
 *       maxLength: 200
 *
 * /input:
 *   post:
 *     summary: Increment the count of a specific key
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 $ref: '#/components/schemas/KeySchema'  # Reuse the key schema
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'  # Reuse the error schema
 *
 * /query:
 *   get:
 *     summary: Get the count of a specific key
 *     parameters:
 *       - in: query
 *         name: key
 *         schema:
 *           $ref: '#/components/schemas/KeySchema'  # Reuse the key schema
 *         required: true
 *         description: The key to count (will be formatted to lowercase and trimmed)
 *     responses:
 *       200:
 *         description: The count of the key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'  # Reuse the error schema
 */
