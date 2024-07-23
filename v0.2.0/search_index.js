var documenterSearchIndex = {"docs":
[{"location":"#SlottedRandomAccess.jl","page":"SlottedRandomAccess.jl","title":"SlottedRandomAccess.jl","text":"","category":"section"},{"location":"","page":"SlottedRandomAccess.jl","title":"SlottedRandomAccess.jl","text":"Documentation for SlottedRandomAccess.jl","category":"page"},{"location":"#Public-API","page":"SlottedRandomAccess.jl","title":"Public API","text":"","category":"section"},{"location":"","page":"SlottedRandomAccess.jl","title":"SlottedRandomAccess.jl","text":"Modules = [SlottedRandomAccess]\nPrivate = false","category":"page"},{"location":"#SlottedRandomAccess.CRDSA","page":"SlottedRandomAccess.jl","title":"SlottedRandomAccess.CRDSA","text":"struct CRDSA{N} <: SlottedRandomAccess.FixedRepSlottedRAScheme{N}\n\nType representing the Contention Resolution Diversity Slotted ALOHA (CRDSA) scheme, with a number of replicas N.\n\nThis RA scheme was introduced in this 2007 IEEE paper.\n\nSee also: MF_CRDSA\n\n\n\n\n\n","category":"type"},{"location":"#SlottedRandomAccess.MF_CRDSA","page":"SlottedRandomAccess.jl","title":"SlottedRandomAccess.MF_CRDSA","text":"struct MF_CRDSA{N, F} <: SlottedRandomAccess.FixedRepSlottedRAScheme{N}\n\nType representing the Multi-Frequency Contention Resolution Diversity Slotted ALOHA (MF-CRDSA) scheme, with a number of replicas N.\n\nThis RA scheme was introduced in this 2017 IEEE paper.\n\nThe scheme can support a number of time slots that is different than the number of replicas, though the originating paper only implements a scheme where one replica (and only one) is sent in each time slot.\n\nnote: Note\nWhen specifying the number of frame slots in the PLR_SimulationParameters, the total number of slots in the frame (nslots) is assumed to be the product of time slots and frequency slots.So for example when putting nslots = 100 in the PLR_SimulationParameters and using a MF-CRDSA scheme with time_slots = 2, the number of frequency slots is assumed to be 50.\n\nThe assumed number of time slots and the function used to generate them randomly can be modified through the structure fields listed below.\n\nFields\n\nn_time_slots::Int64: The number of time slots in each RA frame for this MF-CRDSA scheme, must be a number equal or greater than the number of replicas N\ntime_slots_function::Any: This function is used to generate the time slots (between 1 and time_slots). It should be a function (or callable) that takes no argument and return an NTuple{N, Int} with the time slots of each replica (without repetitions).\n\nnote: Note\nThe current implementation still assumes that there is only a single replica per time slot, so while the time_slots_function is arbitrary, potentially wrong results will be returned if this is not the case.\n\nConstructors\n\nMF_CRDSA{N}()\n\nDefault construct, which assumes N time slots (so one per replica) and that one replica is sent in each time slot (randomizing over the frequency slots).\n\nMF_CRDSA{N}(n_time_slots::Int, time_slots_function)\n\nMore advanced constructor for the MF-CRDSA scheme, which allows specifying a number of time slots different than the number of replicas and the function to be used to generate randomly the time slots to use for each user in each frame.\n\nExample\n\nThe code below will generate a MF-CRDSA scheme with 2 replicas and 3 time slots, where the first time slot is always used for the first replica, while the second replica is sent randomly either in the 2nd or 3rd slot.\n\njulia> scheme = MF_CRDSA{2}(3, () -> (1, rand(2:3)))\n\nSee also: CRDSA\n\n\n\n\n\n","category":"type"},{"location":"#SlottedRandomAccess.PLR_Simulation","page":"SlottedRandomAccess.jl","title":"SlottedRandomAccess.PLR_Simulation","text":"struct PLR_Simulation\n\nType containing the parameters and results of a PLR simulation.\n\nFields\n\nparams::PLR_SimulationParameters: Parameters used for the simulation\nresults::StructArrays.StructArray{SlottedRandomAccess.PLR_Simulation_Point}: Results of the simulation\nscatter_kwargs::Dict{Symbol, Any}: The list of keyword arguments passed to the scatter call for plotting\n\nConstructors\n\nPLR_Simulation(load::AbstractVector; kwargs...)\n\nCreate a PLR_Simulation object by simply providing the load vector. This forwards all the kwargs to the PLR_SimulationParameters constructor.\n\nPLR_Simulation(load::AbstractVector, params::PLR_SimulationParameters; scatter_kwargs = Dict{Symbol, Any}())\n\nThis constructor permits to provide both the load and the params field directly as positional arguments. The custom keyword arguments to pass to the scatter call from PlotlyBase can be provided using the scatter_kwargs keyword argument, which defaults to an empty Dict.\n\nSee also: PLR_SimulationParameters\n\n\n\n\n\n","category":"type"},{"location":"#SlottedRandomAccess.PLR_SimulationParameters","page":"SlottedRandomAccess.jl","title":"SlottedRandomAccess.PLR_SimulationParameters","text":"struct PLR_SimulationParameters{RA, F}\n\nType storing the parameters to be used for a PLR simulation.\n\nFields\n\nscheme::Any: The specific RA scheme\npoisson::Bool: Flag specifying whether the simulation should assume poisson or constant traffic\ncoderate::Float64: The coderate of the packets sent by the users\nM::Int64: The modulation cardinality of the packets sent by the users\npower_dist::Any: Distribution used to generate the random power values\npower_strategy::ReplicaPowerStrategy: The strategy to assign power to the replicas of a given packet. Must be a valid value of ReplicaPowerStrategy enum type.\nmax_simulated_frames::Int64: The number of RA frames to simulate for each Load point\nnslots::Int64: The number of slots in each RA frame\nplr_func::Any: The function used to compute the PLR for a given packet as a function of its equivalent Eb/N0\nnoise_variance::Float64: The variance of the noise, assumed as N0 in the simulation\nSIC_iterations::Int64: The maximum number of SIC iterations to perform during the decoding steps\nmax_errored_frames::Int64: The maximum number of frames with errors to simulate. Once a simulation reaches this number of frames with errors, the simulation will stop.\n\n\n\n\n\n","category":"type"},{"location":"#SlottedRandomAccess.ReplicaPowerStrategy","page":"SlottedRandomAccess.jl","title":"SlottedRandomAccess.ReplicaPowerStrategy","text":"@enum ReplicaPowerStrategy SamePower IndependentPower\n\nEnum used to specify how the power for replicas of a given user in a specific RA frame is determined.\n\nValues\n\nSamePower: All replicas have the same power for a given user in a specific RA frame.\nIndependentPower: Each replica has an independent power in each slot.\n\n\n\n\n\n","category":"type"},{"location":"#SlottedRandomAccess.LogUniform_dB-Tuple{Any, Any}","page":"SlottedRandomAccess.jl","title":"SlottedRandomAccess.LogUniform_dB","text":"LogUniform_dB(min_db,max_db)\n\nDefines a distribution whose pdf is uniform in dB between min_db and max_db.\n\n\n\n\n\n","category":"method"},{"location":"#SlottedRandomAccess.add_scatter_kwargs!-Tuple{PLR_Simulation}","page":"SlottedRandomAccess.jl","title":"SlottedRandomAccess.add_scatter_kwargs!","text":"add_scatter_kwargs!(sim::PLR_Simulation; kwargs...)\n\nAdd arguments to the scatter_kwargs field in the simulation object by merging all the passed keyword arguments with the existing dictionary.\n\n\n\n\n\n","category":"method"},{"location":"#SlottedRandomAccess.extract_plr","page":"SlottedRandomAccess.jl","title":"SlottedRandomAccess.extract_plr","text":"plrs = extract_plr(sim::PLR_Simulation)\nplr = extract_plr(p::Union{PLR_Simulation_Point,PLR_Result})\n\nExtract the PLR value (as a number between 0 and 1) from either a PLR_Simulation or a single PLR_Simulation_Point or PLR_Result.\n\nIn the first case, the function will return a vector with an element for each load point in the PLR_Simulation object.\n\n\n\n\n\n","category":"function"},{"location":"#SlottedRandomAccess.simulate!-Tuple{PLR_Simulation}","page":"SlottedRandomAccess.jl","title":"SlottedRandomAccess.simulate!","text":"simulate!(sim::PLR_Simulation; kwargs...)\n\nPerform the simulation to compute the PLR for each load point in the PLR_Simulation object, using all available threads by default. The function sends a warning if julia is started with a single thread\n\nnote: Note\nPoints that already contain valid simulation results are skipped and a new simulation object must be explicitly created to recompute them.\n\nKeyword Arguments\n\nlogger: The logger to use for displaying the progress of the simulation. Defaults to the default julia logger and also prints to the terminal via TerminalLogger.jl when executed from an interactive julia session (i.e. the REPL).\nntasks: The number of tasks to use for the parallel computation of each PLR point. Uses all available threads if not provided.\n\n\n\n\n\n","category":"method"}]
}
