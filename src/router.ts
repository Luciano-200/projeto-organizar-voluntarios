import { Router } from "express"
import { adminController, authController, needsController, tasksController, usersController, volunteersController } from "./container"

const router = Router()

router.post("/login", authController.login)

router.get("/users", authController.ensureAuth, authController.ensureAdmin, usersController.index)
router.post("/users", usersController.create)
router.get("/users/:id", authController.ensureAuth, authController.ensureAdmin, usersController.show)
router.put("/users/:id", authController.ensureAuth, usersController.update)
router.delete("/users/:id", authController.ensureAuth, usersController.delete)

router.get("/needs", needsController.index)
router.post("/needs", authController.ensureAuth, authController.ensureAdmin, needsController.create)
router.get("/needs/:id", needsController.show)
router.put("/needs/:id", authController.ensureAuth, authController.ensureAdmin, needsController.update)
router.delete("/needs/:id", authController.ensureAuth, authController.ensureAdmin, needsController.delete)

router.get("/tasks", authController.ensureAuth, tasksController.index)
router.post("/tasks", authController.ensureAuth, authController.ensureAdmin, tasksController.create)
router.get("/tasks/:id", authController.ensureAuth, tasksController.show)
router.put("/tasks/:id", authController.ensureAuth, authController.ensureAdmin, tasksController.update)
router.delete("/tasks/:id", authController.ensureAuth, authController.ensureAdmin, tasksController.delete)

router.get("/volunteers", authController.ensureAuth, volunteersController.index)
router.post("/volunteers", authController.ensureAuth, volunteersController.create)
router.get("/volunteers/:id", authController.ensureAuth, volunteersController.show)
router.put("/volunteers/:id", authController.ensureAuth, volunteersController.update)
router.delete("/volunteers/:id", authController.ensureAuth, volunteersController.delete)

router.put("/taskVolunteers/:id", authController.ensureAuth, authController.ensureAdmin, tasksController.addVolunteer )
router.delete("/taskVolunteers/:id", authController.ensureAuth, authController.ensureAdmin, tasksController.removeVolunteer)

router.get("/organizers", authController.ensureAuth, authController.ensureAdmin, adminController.index)
router.post("/organizers", authController.ensureAuth, authController.ensureAdmin, adminController.create)
router.get("/organizers/:id", authController.ensureAuth, authController.ensureAdmin, adminController.show)
router.delete("/organizers/:id", authController.ensureAuth, authController.ensureAdmin, adminController.delete)


router.get("/status", async (req, res, next) => {
  try {
    res.json({ message: "OK" })
  } catch (error) {
    next(error)
  }
})

export { router }