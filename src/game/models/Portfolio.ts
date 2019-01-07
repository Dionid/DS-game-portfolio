

enum EFoldersType {
    SPA = "SPA",
    XXX = "XXX",
}

interface IProject {
    id: string
    name: string
    folderType: EFoldersType
}

const projects: IProject[] = [
    {
        id: "0",
        name: "Prostor",
        folderType: EFoldersType.SPA,
    },
    {
        id: "1",
        name: "RuCont",
        folderType: EFoldersType.SPA,
    },
]

export interface IProjectsById {
    [key: string]: IProject
}

const projectsById: IProjectsById = projects.reduce((acc: IProjectsById, pr: any) => {
    acc[pr.id] = pr
    return acc
}, {})

const projectsByFoldersType: { [key: string]: string[] } = Object.keys(EFoldersType)
    .reduce((acc: { [key: string]: string[] }, fT) => {
        acc[fT] = projects.filter((pr) => pr.folderType === fT).map((pr) => pr.id)
        return acc
    }, {})

// console.log(projectsById)
// console.log(projectsByFoldersType)

export {
    EFoldersType,
    projects,
    projectsById,
    projectsByFoldersType,
}
