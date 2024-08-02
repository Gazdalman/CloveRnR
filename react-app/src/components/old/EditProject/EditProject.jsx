import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { setRequestedProject } from "../../store/userProjects";
import ProjectForm from "../ProjectForm/index";


const EditProject = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)
  const { projectId } = useParams();
  const user = useSelector(state => state.session.user);
  const [project, setProject] = useState("")

  useEffect(() => {
    const loadProject = async () => {
      const gotProject = await dispatch(setRequestedProject(projectId))
      setProject(gotProject)
    }
    loadProject()
    setIsLoaded(true)
  }, [dispatch]);


  return isLoaded && Object.keys(project).length ? (
    <>
      {+user.id == +project.userId ? <>
        <ProjectForm type={"edit"} project={project}/>
      </> : history.replace("/unauthorized")
      }
    </>
  ) : null
}

export default EditProject;
