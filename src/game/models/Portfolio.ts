

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

const projectsById: { [key: string]: IProject } = projects.reduce((acc: { [key: string]: IProject }, pr: any) => {
    acc[pr.id] = pr
    return acc
}, {})

const projectsByFoldersType: { [key: string]: IProject[] } = Object.keys(EFoldersType)
    .reduce((acc: { [key: string]: IProject[] }, fT) => {
        acc[fT] = projects.filter((pr) => pr.folderType === fT)
        return acc
    }, {})

console.log(projectsById)
console.log(projectsByFoldersType)

export {
    EFoldersType,
    projects,
    projectsById,
    projectsByFoldersType,
}
