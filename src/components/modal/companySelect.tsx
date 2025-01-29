import { company } from "@/apis"
import { Cascader } from "antd";
import useSWR from "swr"

const CompanySelect = () => {

	const {SHOW_CHILD} = Cascader;

	const {data , error , mutate} = useSWR(`/swr.getlist.list`, async () => {
		const data = await company.getAll();
		return data
	})

	console.log(data)


	const companyCheck = (e:any) => {
		console.log(e);
	}

	const options = data?.map((item:any) => {
		const child = item?.departments?.map((dep:any) => {
			const child1 = dep?.branches?.map((branch:any) => {
				const child2 = branch?.brands?.map((brand:any) => {
					return{
						...brand,
						value:brand?._id,
						label:brand?.name
					}
				})
				return{
					...branch,
					value:branch._id,
					children:child2,
					label:branch?.name
				}
			})
			return {
				...dep,
				value:dep?._id,
				children:child1,
				label:dep?.name
			}
		})
		return{
			...item,
			label:item?.name,
			value:item?._id,
			children:child
		}
	})


	return(
		<div>
			<div>
				<Cascader options={options} onChange={companyCheck}
				multiple
				style={{ width: '100%' }}
				// defaultOpen
				// open={true}
				showCheckedStrategy={SHOW_CHILD}
				/>
			</div>
		</div>
	)
}

export default CompanySelect